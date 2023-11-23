import { panel, heading, text, divider } from '@metamask/snaps-ui'
import { TSimulationPanel } from './types/panels.type'
import {
    headingText,
    simulationBalanceChange,
    evmErrorAddress,
    evmErrMessage,
    serviceError,
    balanceWithUsd,
    balanceWithoutUsd,
    transactionMethodIs,
} from '../../constants/content'
import { covertPaymentDetail } from '../simulationContent'

export const convertToSimulationPanel: TSimulationPanel = async (result, error) => {
    if (error) {
        return panel([
            heading(headingText.transactionSimulation),
            divider(),
            text(serviceError.simulationError),
            text(`${JSON.stringify(error)}`),
            divider(),
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
            divider(),
        ])
    }

    if (result.senderAssetChange == null && result.contracts == null) {
        return panel([])
    }

    let transactionMethod = []
    let paymentDetail = []
    let balanceChange = []
    let recipients = []

    //transaction method
    if (result.txnMethodName != null && result.txnMethodName != '') {
        transactionMethod = [text(transactionMethodIs(result.txnMethodName)), divider()]
    }
    // payment detail
    if (
        result.senderAssetChange != null &&
        result.senderAssetChange.tokenChanges != null &&
        result.senderAssetChange.tokenChanges.length > 0
    ) {
        paymentDetail = await covertPaymentDetail(result.senderAssetChange.tokenChanges)
    }

    // balance diff
    if (result.senderAssetChange != null && result.senderAssetChange.balanceDiff != null) {
        const originWei = result.senderAssetChange.balanceDiff.origin
        const originUSD = result.senderAssetChange.balanceDiff.originDollarValue
        const afterWei = result.senderAssetChange.balanceDiff.after
        const afterUSD = result.senderAssetChange.balanceDiff.afterDollarValue
        const diffWei = Math.abs(afterWei - originWei)
        const diffUSD = Math.abs(afterUSD - originUSD)

        balanceChange = [
            heading(headingText.balanceChanges),
            text(simulationBalanceChange.balanceChangeBefore),
            text(convertWeiToEthWithUSD(originWei, originUSD)),
            text(simulationBalanceChange.balanceChangeAfter),
            text(convertWeiToEthWithUSD(afterWei, afterUSD)),
            text(`**${simulationBalanceChange.separators}**`),
            text(`**${simulationBalanceChange.balanceDiff}**`),
            text(`**${convertWeiToEthWithUSD(diffWei, diffUSD)}**`),
        ]
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

    return panel([...transactionMethod, ...paymentDetail, ...balanceChange, divider()])
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
