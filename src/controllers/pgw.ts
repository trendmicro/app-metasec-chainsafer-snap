import type { IPostTransactionRisksResponseBody } from '../helpers/parser/pgw/types/postTransactionRisks.type'
import type { IPostTransactionRiskSummaryResponseBody } from '../helpers/parser/pgw/types/postTransactionRiskSummary.type'
import type { IPostTransactionSimulationResponseBody } from '../helpers/parser/pgw/types/postTransactionSimulation.type'
import type { IGetSnapLatestVersionResponseBody } from '../helpers/parser/pgw/types/getSnapLatestVersion.type'
import type { IGetTokenInfoResponseBody } from '../helpers/parser/pgw/types/getTokenInfo.type'
import type { IGetAddressLabelsResponseBody } from '../helpers/parser/pgw/types/getAddressLabel.type'
import type {
    TGetSnapLatestVersion,
    TOnResponseErrorCode,
    TPostTransactionRisks,
    TPostTransactionRiskSummary,
    TPostTransactionSimulation,
    TGetTokenInfo,
    TGetAddressLabel,
} from '../controllers/types/pgw.type'

import { generatedUUIDV4 } from '../helpers/secret'
import Logger from '../controllers/logger'
import { createUrlBase, get, payload, post } from '../controllers/http'

import pgwParser from '../helpers/parser/pgw'
import { APP_PLATFORM } from '../constants/config'

const logger = new Logger('[controllers.pgw]')
const pgwBase = createUrlBase('PGW')

export const onResponseErrorCode: TOnResponseErrorCode = (response, responseBody) => {
    //able to be extended if any further spec
    //there is no any payload sometime when statusCode is 50X
    const { status } = response
    const error = {
        httpStatusCode: status,
        traceId: responseBody?.trace_id,
        errorCode: responseBody?.err_code,
        message: responseBody?.message,
        dateTime: responseBody?.datetime,
    }

    return error
}

const header = (addition = {}) => {
    return {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Trace-ID': generatedUUIDV4(), //frontend generated guid per request, need regenerate when retry
        'X-App-Platform': APP_PLATFORM,
        ...addition,
    }
}

const postTransactionRisks: TPostTransactionRisks = async (
    postTransactionRequestBody,
    headerOption = {}
) => {
    const keyPath = 'POST_TRANSACTION_RISKS'
    const url = pgwBase(keyPath)
    const body = postTransactionRequestBody
    const headers = header(headerOption)

    logger.log('postTransactionRisks', 'head', headers)
    logger.log('postTransactionRisks', 'body', body)

    const request = await post(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IPostTransactionRisksResponseBody>()

    logger.log('postTransactionRisks', 'error', error)
    logger.log('postTransactionRisks', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('postTransactionRisks', 'responseParsed', responseParsed)

    return responseParsed
}

const postTransactionRiskSummary: TPostTransactionRiskSummary = async (
    postTransactionRequestBody,
    headerOption = {}
) => {
    const keyPath = 'POST_TRANSACTION_RISK_SUMMARY'
    const url = pgwBase(keyPath)
    const body = postTransactionRequestBody
    const headers = await header(headerOption)

    logger.log('postTransactionRiskSummary', 'head', headers)
    logger.log('postTransactionRiskSummary', 'body', body)

    const request = await post(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IPostTransactionRiskSummaryResponseBody>()

    logger.log('postTransactionRiskSummary', 'error', error)
    logger.log('postTransactionRiskSummary', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('postTransactionRiskSummary', 'responseParsed', responseParsed)

    return responseParsed
}

const postTransactionSimulation: TPostTransactionSimulation = async (
    postTransactionRequestBody,
    headerOption = {}
) => {
    const keyPath = 'POST_TRANSACTION_SIMULATION'
    const url = pgwBase(keyPath)
    const body = postTransactionRequestBody
    const headers = await header(headerOption)

    logger.log('postTransactionSimulation', 'head', headers)
    logger.log('postTransactionSimulation', 'body', body)

    const request = await post(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IPostTransactionSimulationResponseBody>()

    logger.log('postTransactionSimulation', 'error', error)
    logger.log('postTransactionSimulation', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('postTransactionSimulation', 'responseParsed', responseParsed)

    return responseParsed
}

const getSnapLatestVersion: TGetSnapLatestVersion = async (headerOption = {}) => {
    const keyPath = 'GET_SNAP_LATEST_VERSION'
    const url = pgwBase(keyPath)
    const body = {}
    const headers = header(headerOption)

    logger.log('getSnapLatestVersion', 'head', headers)
    logger.log('getSnapLatestVersion', 'body', body)

    const request = await get(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IGetSnapLatestVersionResponseBody>()

    logger.log('getSnapLatestVersion', 'error', error)
    logger.log('getSnapLatestVersion', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('getSnapLatestVersion', 'responseParsed', responseParsed)

    return responseParsed
}

const getTokenInfo: TGetTokenInfo = async (contractAddress, headerOption = {}) => {
    const keyPath = 'GET_TOKEN_INFO'
    const url = pgwBase(keyPath, (path: string) =>
        path.replace('{contractAddress}', contractAddress)
    )
    const body = {}
    const headers = header(headerOption)

    logger.log('getTokenInfo', 'head', headers)
    logger.log('getTokenInfo', 'body', body)

    const request = await get(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IGetTokenInfoResponseBody>()

    logger.log('getTokenInfo', 'error', error)
    logger.log('getTokenInfo', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('getTokenInfo', 'responseParsed', responseParsed)

    return responseParsed
}
const getAddressLabel: TGetAddressLabel = async (contractAddress, headerOption = {}) => {
    const keyPath = 'GET_ADDRESS_LABEL'
    const url = pgwBase(keyPath, (path: string) =>
        path.replace('{contractAddress}', contractAddress)
    )
    const body = {}
    const headers = header(headerOption)

    logger.log('getAddressLabel', 'head', headers)
    logger.log('getAddressLabel', 'body', body)

    const request = await get(url, payload(body, headers), onResponseErrorCode)
    const [error, response] = await request<IGetAddressLabelsResponseBody>()

    logger.log('getAddressLabel', 'error', error)
    logger.log('getAddressLabel', 'response', response)

    if (error) {
        throw error
    }

    const responseParsed = pgwParser[keyPath](response)
    logger.log('getAddressLabel', 'responseParsed', responseParsed)

    return responseParsed
}

export default {
    postTransactionRisks,
    postTransactionRiskSummary,
    postTransactionSimulation,
    getSnapLatestVersion,
    getTokenInfo,
    getAddressLabel,
}
