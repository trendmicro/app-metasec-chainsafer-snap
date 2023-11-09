import { panel, heading, text, divider } from '@metamask/snaps-ui'
import { TSimulationPanel } from './types/panels.type'
import {
    headingText,
    simulationBalanceChange,
    tokenSymbolAndValue,
    evmErrorAddress,
    evmErrMessage,
    serviceError,
    balanceWithUsd,
    balance,
    tokenNameWithBlueMark,
    tokenNameWithoutBlueMark,
} from '../../constants/content'
import Logger from '../../controllers/logger'
const logger = new Logger('[helper.panels.simulationPanel]')

export const convertToSimulationPanel: TSimulationPanel = (result, error, isBlueMark) => {
    if (error) {
        return panel([
            heading(headingText.transactionSimulation),
            divider(),
            text(serviceError.simulationError),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    if (result.evmErrAddress != '' || result.evmErrMessage != '') {
        return panel([
            heading(headingText.transactionSimulation),
            divider(),
            text(serviceError.simulationError),
            text(evmErrorAddress(result.evmErrAddress)),
            text(evmErrMessage(result.evmErrMessage)),
        ])
    }

    if (result.senderAssetChange == null && result.contracts == null) {
        return panel([])
    }

    let paymentDetailPanel = []
    let tokenChangePanel = []
    let balanceChangePanel = []

    if (result.senderAssetChange != null && result.senderAssetChange.balanceDiff != null) {
        const originWei = result.senderAssetChange.balanceDiff.origin
        const originUSD = result.senderAssetChange.balanceDiff.originDollarValue
        const afterWei = result.senderAssetChange.balanceDiff.after
        const afterUSD = result.senderAssetChange.balanceDiff.afterDollarValue
        const diffWei = afterWei - originWei
        const diffUSD = afterUSD - originUSD

        paymentDetailPanel = [
            heading(headingText.paymentDetailPanel),
            text(headingText.pay),
            text(convertWeiToEthWithUSD(diffWei, diffUSD)),
        ]
        balanceChangePanel = [
            heading(headingText.balanceChanges),
            divider(),
            text(simulationBalanceChange.balanceChangeBefore),
            text(convertWeiToEthWithUSD(originWei, originUSD)),
            text(simulationBalanceChange.balanceChangeAfter),
            text(convertWeiToEthWithUSD(afterWei, afterUSD)),
            text(`**${simulationBalanceChange.separators}**`),
            text(`**${simulationBalanceChange.balanceDiff}**`),
            text(`**${convertWeiToEthWithUSD(diffWei, diffUSD)}**`),
        ]
    }

    // payment detail panel
    if (
        result.senderAssetChange != null &&
        result.senderAssetChange.tokenChanges != null &&
        result.senderAssetChange.tokenChanges.length > 0
    ) {
        result.senderAssetChange.tokenChanges.forEach(function (tokenChange) {
            tokenChangePanel.push(
                text(paymentDetailTokenChange(tokenChange.direction)),
                text(
                    tokenSymbolAndValue(
                        tokenChange.type,
                        tokenChange.symbol,
                        `$raw_amount`,
                        Number(tokenChange.dollarValue.toFixed(2))
                    )
                ),
                text(covertTokenNameWithReputation(tokenChange.name, isBlueMark))
            )
        })
    }

    return panel([...paymentDetailPanel, ...tokenChangePanel, ...balanceChangePanel])
}

function covertTokenNameWithReputation(tokenName: string, isBlueMark: boolean): string {
    if (tokenName && tokenName != '') {
        if (isBlueMark) {
            return tokenNameWithBlueMark(tokenName)
        } else {
            return tokenNameWithoutBlueMark(tokenName)
        }
    }
    return ''
}

function convertWeiToEthWithUSD(wei: number, usd: number): string {
    if (Number.isNaN(wei)) {
        return balanceWithUsd(0, 0)
    } else {
        const eth = wei / 1e18
        if (Number.isNaN(usd)) {
            return balance(eth)
        } else {
            return balanceWithUsd(eth, Number(usd.toFixed(2)))
        }
    }
}

function paymentDetailTokenChange(direction: string): string {
    if (direction == 'in') {
        return simulationBalanceChange.paymentDetailPanelGet
    }
    return simulationBalanceChange.paymentDetailPanelSell
}
