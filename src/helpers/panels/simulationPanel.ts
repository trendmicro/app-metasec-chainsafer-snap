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
    countRecipient,
    recipientLableInfo,
    recipientListWarningContractTitle,
} from '../../constants/content'
import { covertPaymentDetail } from '../simulationContent'
import { TGetAddressLabel } from './types/panels.type'
import postTransactionSimulation from '../parser/pgw/postTransactionSimulation'
import { getAddressLabel } from '../../controllers/chainsafer'
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
    let addressLabelsResult = []
    let addressLabelsError = []
    if (result && result.recipientAssetChanges != null && result.recipientAssetChanges.length > 0) {
        recipients = [
            heading(headingText.recipientsPanel),
            text(countRecipient(result.recipientAssetChanges.length)),
        ]
        let addressList = []
        for (let i = 0; i < result.recipientAssetChanges.length; i++) {
            // get recipient address is CA or EOA first
            let addressIsEoa = convertRecipientAddressIsContract(
                result.recipientAssetChanges[i].isContract,
            )
            const [recipientsResult, recipientsError] = await getAddressLabel(
                result.recipientAssetChanges[i].address,
            )
            addressLabelsResult.push(recipientsResult)
            addressLabelsError.push(addressLabelsError)
            convertToRecipientsPanel(recipientsResult, recipientsError)
            //if get address label panel is not null, return result
            if (convertToRecipientsPanel(recipientsResult, recipientsError).children.length != 0) {
                warningAddressCount++
                addressList.push(text(addressIsEoa), text(result.recipientAssetChanges[i].address))
            }
            addressList.push(convertToRecipientsPanel(recipientsResult, recipientsError))
        }
        if (warningAddressCount > 0) {
            recipients.push(text(recipientListWarningContractTitle(warningAddressCount)))
            warningAddressCount = 0
        }

        recipients = recipients.concat(addressList)
    }
    return panel([
        ...transactionMethod,
        ...paymentDetail,
        ...balanceChange,
        ...recipients,
        divider(),
    ])
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
function convertRecipientAddressIsContract(isContract: boolean): string {
    if (isContract) {
        return `• {CA}`
    }
    return `• {EOA}`
}
let warningAddressCount = 0
export const convertToRecipientsPanel: TGetAddressLabel = (result, error) => {
    let recipientsPanel = []
    if (result == null) {
        return panel([])
    }
    if (error) {
        return panel([])
    }
    if (result != null && result.labelInfos != null && result.labelInfos.length > 0) {
        for (let i = 0; i < result.labelInfos.length; i++) {
            let riskLevel = result.labelInfos[i].risk_level
            // riskLevel condition
            if (riskLevel >= 3) {
                if (result.labelInfos[i].labels != null && result.labelInfos[i].labels.length > 0) {
                    for (let j = 0; j < result.labelInfos[i].labels.length; j++) {
                        let labelName = result.labelInfos[i].labels[j].name
                        let source = result.labelInfos[i].labels[j].source
                        recipientsPanel.push(text(recipientLableInfo(labelName, source)))
                    }
                }
            }
        }
    }
    return panel(recipientsPanel)
}
