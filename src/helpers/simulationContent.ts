import { Panel, heading, panel, text } from '@metamask/snaps-sdk'
import { TPaymentDetail } from './panels/types/panels.type'
import {
    simulationBalanceChange,
    tokenSymbolAndValue,
    tokenNameWithBlueMark,
    tokenNameWithoutBlueMark,
    headingText,
} from '../constants/content'
import Logger from '../controllers/logger'
import { getTokenInfo } from '../controllers/chainsafer'
import { IPostTransactionSimulationTokenChangeParsed } from './parser/pgw/types/postTransactionSimulation.type'
const logger = new Logger('[helper.panels.paymentDetailPanel]')

export const covertPaymentDetail: TPaymentDetail = async (tokenChanges) => {
    const filterPayDetails = tokenChanges.filter((tokenChange) => tokenChange.direction == 'out')
    const filterGetDetails = tokenChanges.filter((tokenChange) => tokenChange.direction == 'in')
    const payDetails = await getPaymentDetails(filterPayDetails)
    const getDetails = await getPaymentDetails(filterGetDetails)
    let paymentDetailPanel = []
    paymentDetailPanel.push(heading(headingText.paymentDetailPanel))
    paymentDetailPanel.push(text(simulationBalanceChange.paymentDetailPanelPay))
    paymentDetailPanel.push(panel(payDetails))
    paymentDetailPanel.push(text(simulationBalanceChange.paymentDetailPanelGet))
    paymentDetailPanel.push(panel(getDetails))
    return paymentDetailPanel
}

function caculateRawAmonut(rawAmount: string, decimals: number): string {
    if (rawAmount != null && rawAmount != '') {
        const amount = Number(rawAmount) / Math.pow(10, decimals)
        return amount.toString()
    }
    return ''
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

async function getPaymentDetails(
    tokenChanges: IPostTransactionSimulationTokenChangeParsed[]
): Promise<any[]> {
    const detail = []

    for (const token of tokenChanges) {
        detail.push(
            text(
                tokenSymbolAndValue(
                    token.type.toUpperCase(),
                    token.symbol.toUpperCase(),
                    caculateRawAmonut(token.rawAmount, token.decimals),
                    Number.isNaN(token.dollarValue) ? 0 : Number(token.dollarValue.toFixed(2))
                )
            )
        )

        if (token.direction === 'in') {
            const [result, error] = await getTokenInfo(token.contractAddress)
            if (result && result.BlueCheckMark) {
                detail.push(text(covertTokenNameWithReputation(token.name, result.BlueCheckMark)))
            }
        }
    }

    return detail
}
