import pgw from './pgw'
import Logger from './logger'
import { proxyConvertToPayload } from './../helpers/proxyRestructure'
import { ISendTransactionProxyPayload } from './../helpers/types/proxyRestructure.type'
import { IResponseError } from './../controllers/types/http.type'
import { Json } from '@metamask/snaps-types'
import { IPostTransactionRisksResponseParsed } from '../helpers/parser/pgw/types/postTransactionRisks.type'
import {
    IPostTransactionSimulationRequestPayload,
    IPostTransactionSimulationResponseParsed,
} from '../helpers/parser/pgw/types/postTransactionSimulation.type'
import { IPostTransactionRiskSummaryResponseParsed } from './../helpers/parser/pgw/types/postTransactionRiskSummary.type'
import { IGetSnapLatestVersionResponseParsed } from '../helpers/parser/pgw/types/getSnapLatestVersion.type'
import {
    IGetTokenInfoResponseParsed
} from '../helpers/parser/pgw/types/getTokenInfo.type'

const logger = new Logger('[controllers.chainsafer]')

export const postTransactionRiskSummary = async (
    original: string,
    transaction: Json
): Promise<[IPostTransactionRiskSummaryResponseParsed, IResponseError]> => {
    let result: IPostTransactionRiskSummaryResponseParsed =
        {} as IPostTransactionRiskSummaryResponseParsed
    let error: IResponseError = null

    const txn = {
        method: 'eth_sendTransaction',
        url: original,
        params: [transaction],
    }

    try {
        result = await pgw.postTransactionRiskSummary(
            proxyConvertToPayload(original, txn as ISendTransactionProxyPayload)
        )
    } catch (e) {
        logger.error(`${JSON.stringify(e)}`)
        error = e
    }

    return [result, error]
}

export const postTransactionRisk = async (
    original: string,
    transaction: Json
): Promise<[IPostTransactionRisksResponseParsed, IResponseError]> => {
    let result: IPostTransactionRisksResponseParsed = {} as IPostTransactionRisksResponseParsed
    let error: IResponseError = null

    const txn = {
        method: 'eth_sendTransaction',
        url: original,
        params: [transaction],
    }

    try {
        result = await pgw.postTransactionRisks(
            proxyConvertToPayload(original, txn as ISendTransactionProxyPayload)
        )
    } catch (e) {
        logger.error(`${JSON.stringify(e)}`)
        error = e
    }

    return [result, error]
}

export const postTransactionSimulation = async (
    chainId: string,
    transaction: Json
): Promise<[IPostTransactionSimulationResponseParsed, IResponseError]> => {
    let result: IPostTransactionSimulationResponseParsed =
        {} as IPostTransactionSimulationResponseParsed
    let error: IResponseError = null

    let payload = {
        network_id: chainId.split(':')[1].length == 2 ? chainId.split(':')[1] : '1',
        from: transaction['from'] || '',
        to: transaction['to'] || '',
        call_data: transaction['data'] || '',
        value: parseInt(transaction['value'], 16) || 0,
        gas: parseInt(transaction['gas'], 16) || 0,
    } as IPostTransactionSimulationRequestPayload

    try {
        result = await pgw.postTransactionSimulation(payload)
    } catch (e) {
        logger.error(`${JSON.stringify(e)}`)
        error = e
    }

    return [result, error]
}

export const getSnapLatestVersion = async (): Promise<
    [IGetSnapLatestVersionResponseParsed, IResponseError]
> => {
    let result: IGetSnapLatestVersionResponseParsed = {} as IGetSnapLatestVersionResponseParsed
    let error: IResponseError = null

    try {
        result = await pgw.getSnapLatestVersion()
    } catch (e) {
        logger.error(`${JSON.stringify(e)}`)
        error = e
    }

    return [result, error]
}

export const getTokenInfo = async (
    contractAddress: string
): Promise<[IGetTokenInfoResponseParsed, IResponseError]> => {
    let result: IGetTokenInfoResponseParsed = {} as IGetTokenInfoResponseParsed
    let error: IResponseError = null

    try {
        result = await pgw.getTokenInfo(contractAddress)
    } catch (e) {
        logger.error(`${JSON.stringify(e)}`)
        error = e
    }

    return [result, error]
}
