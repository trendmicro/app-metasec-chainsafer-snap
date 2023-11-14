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
    balanceWithoutUsd,
    tokenNameWithBlueMark,
    tokenNameWithoutBlueMark,
    transactionMethodIs,
} from '../../constants/content'

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

    let transactionMethod = []
    let paymentDetail = []
    let tokenChanges = []
    let balanceChange = []
    let recipients = []

    //transaction method
    if (result.txnMethodName != null && result.txnMethodName != '') {
        transactionMethod = [divider(), text(transactionMethodIs(result.txnMethodName)), divider()]
    }

    // payment detail
    if (result.senderAssetChange != null && result.senderAssetChange.balanceDiff != null) {
        const originWei = result.senderAssetChange.balanceDiff.origin
        const originUSD = result.senderAssetChange.balanceDiff.originDollarValue
        const afterWei = result.senderAssetChange.balanceDiff.after
        const afterUSD = result.senderAssetChange.balanceDiff.afterDollarValue
        const diffWei = Math.abs(afterWei - originWei)
        const diffUSD = Math.abs(afterUSD - originUSD)

        paymentDetail = [
            heading(headingText.paymentDetailPanel),
            text(headingText.pay),
            text(convertWeiToEthWithUSD(diffWei, diffUSD)),
        ]
        balanceChange = [
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

    // token changes
    if (
        result.senderAssetChange != null &&
        result.senderAssetChange.tokenChanges != null &&
        result.senderAssetChange.tokenChanges.length > 0
    ) {
        result.senderAssetChange.tokenChanges.forEach(function (tokenChange) {
            tokenChanges.push(
                text(paymentDetailTokenChange(tokenChange.direction)),
                text(
                    tokenSymbolAndValue(
                        tokenChange.type.toUpperCase(),
                        tokenChange.symbol.toUpperCase(),
                        caculateRawAmonut(tokenChange.rawAmount, tokenChange.decimals),
                        Number(tokenChange.dollarValue.toFixed(2))
                    )
                ),
                text(covertTokenNameWithReputation(tokenChange.name, isBlueMark))
            )
        })
    }

    // recipients
    recipients = [
        heading(headingText.recipientsPanel),
        text(
            'This transaction goes thru 4 contracts/ recipients, 1 of them might exist security concern:'
        ),
        text('{CA} '),
        text('0xed1bd4a5244d35be12e84a3e9821290032a47a99 🚨Label: phishing_Etherscan'),
    ]

    return panel([...transactionMethod, ...paymentDetail, ...tokenChanges, ...balanceChange])
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
            return balanceWithoutUsd(eth)
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
function caculateRawAmonut(rawAmount: string, decimals: number): string {
    if (rawAmount != null && rawAmount != '') {
        const amount = Number(rawAmount) / Math.pow(10, decimals)
        return amount.toString()
    }
    return ''
    
}

