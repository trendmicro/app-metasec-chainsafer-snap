import type { IPostSignUpResponseBody } from 'helpers/parser/pgw/types/postSignUp.type'
import type { IGetNonceResponseBody } from 'helpers/parser/pgw/types/getNonce.type'
import type { IPostLoginResponseBody } from 'helpers/parser/pgw/types/postLogin.type'
import type { IPostRenewTokenResponseBody } from 'helpers/parser/pgw/types/postRenewToken.type'
import type { IGetAddressInfoResponseBody } from 'helpers/parser/pgw/types/getAddressInfo.type'
import type { IPostInquiryIdResponseBody } from 'helpers/parser/pgw/types/postInquiryId.type'
import type { IGetTransactionInquiresResponseBody } from 'helpers/parser/pgw/types/getTransactionInquires.type'
import type { IPostTransactionRisksResponseBody } from 'helpers/parser/pgw/types/postTransactionRisks.type'
import type { IPostTransactionRiskSummaryResponseBody } from 'helpers/parser/pgw/types/postTransactionRiskSummary.type'
import type { IPostFeedbackCaseResponseBody } from 'helpers/parser/pgw/types/postFeedbackCase.type'
import type { IPostCreateOrderResponseBody } from 'helpers/parser/pgw/types/postCreateOrder.type'
import type { IGetUserProfileResponseBody } from 'helpers/parser/pgw/types/getUserProfile.type'
import type {
  TPostSignUp,
  TGetNonce,
  TPostLogin,
  TPostRenewToken,
  TOnResponseErrorCode,
  TGetAddressInfo,
  TPostInquiryId,
  TGetTransactionInquires,
  TPostTransactionRisks,
  TPostFeedbackCase,
  TPostTransactionRiskSummary,
  TGetUserProfile,
  TPostCreateOrder,
} from 'controllers/types/pgw.type'

import { generatedUUIDV4 } from 'helpers/secret'
import Logger from 'controllers/logger'
import storage from 'controllers/storage'
import { createUrlBase, payload, get, post, put, patch } from 'controllers/http'

import pgwParser from 'helpers/parser/pgw'

const logger = new Logger('[controllers.pgw]')
const pgwBase = createUrlBase('PGW')

export const onResponseErrorCode: TOnResponseErrorCode = (response, responseBody) => {
  // able to be extended if any further spec
  // there is no any payload sometime when statusCode is 50X
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
    'X-Trace-ID': generatedUUIDV4(), // frontend generated guid per request, need regenerate when retry
    'X-Client-ID': storage.get('clientId') || clientId(),
    'X-App-Platform': 'snap',
    'X-App-Version': '',
    ...addition,
  }
}

const clientId = () => {
  const clientId = generatedUUIDV4()
  storage.set('clientId', clientId)
  return clientId
}

const postSignUp: TPostSignUp = async (postSignUpRequestBody, headerOption = {}) => {
  const keyPath = 'POST_SIGN_UP'
  const url = pgwBase(keyPath)
  const body = postSignUpRequestBody
  const headers = header(headerOption)

  logger.log('postSignUp', 'head', headers)
  logger.log('postSignUp', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostSignUpResponseBody>()

  logger.log('postSignUp', 'error', error)
  logger.log('postSignUp', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postSignUp', 'responseParsed', responseParsed)

  return responseParsed
}

const getNonce: TGetNonce = async (address, headerOption = {}) => {
  const keyPath = 'GET_NONCE'
  const url = pgwBase(keyPath, (path: string) => path.replace('{address}', address))
  const body = {}
  const headers = header(headerOption)

  logger.log('getNonce', 'head', headers)
  logger.log('getNonce', 'body', body)

  const request = await get(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IGetNonceResponseBody>()

  logger.log('getNonce', 'error', error)
  logger.log('getNonce', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('getNonce', 'responseParsed', responseParsed)

  return responseParsed
}

const postLogin: TPostLogin = async (postLoginRequestBody, headerOption = {}) => {
  const keyPath = 'POST_LOGIN'
  const url = pgwBase(keyPath)
  const body = postLoginRequestBody
  const headers = header(headerOption)

  logger.log('postLogin', 'head', headers)
  logger.log('postLogin', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostLoginResponseBody>()

  logger.log('postLogin', 'error', error)
  logger.log('postLogin', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postLogin', 'responseParsed', responseParsed)

  return responseParsed
}

const postRenewToken: TPostRenewToken = async (postRenewTokenRequestBody, headerOption = {}) => {
  const keyPath = 'POST_RENEW_TOKEN'
  const url = pgwBase(keyPath)
  const body = postRenewTokenRequestBody
  const headers = header(headerOption)

  logger.log('postRenewToken', 'head', headers)
  logger.log('postRenewToken', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostRenewTokenResponseBody>()

  logger.log('postRenewToken', 'error', error)
  logger.log('postRenewToken', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postRenewToken', 'responseParsed', responseParsed)

  return responseParsed
}

const getAddressInfo: TGetAddressInfo = async (address, headerOption = {}) => {
  const keyPath = 'GET_CONTRACT_ADDRESS'
  const url = pgwBase(keyPath, (path: string) => path.replace('{address}', address))
  const body = {}
  const headers = header(headerOption)

  logger.log('getAddressInfo', 'head', headers)
  logger.log('getAddressInfo', 'body', body)

  const request = await get(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IGetAddressInfoResponseBody>()

  logger.log('getAddressInfo', 'error', error)
  logger.log('getAddressInfo', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('getAddressInfo', 'responseParsed', responseParsed)

  return responseParsed
}

const postInquiryId: TPostInquiryId = async (postInquiryRequestBody, headerOption = {}) => {
  const keyPath = 'POST_INQUIRY_ID'
  const url = pgwBase(keyPath)
  const body = postInquiryRequestBody
  const headers = header(headerOption)

  logger.log('postInquiryId', 'head', headers)
  logger.log('postInquiryId', 'url', url)
  logger.log('postInquiryId', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostInquiryIdResponseBody>()

  logger.log('postInquiryId', 'error', error)
  logger.log('postInquiryId', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postInquiryId', 'responseParsed', responseParsed)

  return responseParsed
}

const getTransactionInquires: TGetTransactionInquires = async (inquiryId, headerOption = {}) => {
  const keyPath = 'GET_TRANSACTION_INQUIRES'
  const url = pgwBase(keyPath, (path: string) => path.replace('{inquiry_id}', inquiryId))
  const body = {}
  const headers = header(headerOption)

  logger.log('getTransactionInquires', 'head', headers)
  logger.log('getTransactionInquires', 'body', body)

  const request = await get(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IGetTransactionInquiresResponseBody>()

  logger.log('getTransactionInquires', 'error', error)
  logger.log('getTransactionInquires', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('getTransactionInquires', 'responseParsed', responseParsed)

  return responseParsed
}

const postTransactionRisks: TPostTransactionRisks = async (postTransactionRequestBody, headerOption = {}) => {
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

const getUserProfile: TGetUserProfile = async (username, headerOption = {}) => {
  const keyPath = 'GET_USER_PROFILE'
  const url = pgwBase(keyPath, (path: string) => path.replace('{user_name}', username))
  const body = {}
  const headers = header(headerOption)

  logger.log('getUserProfile', 'head', headers)
  logger.log('getUserProfile', 'body', body)

  const request = await get(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IGetUserProfileResponseBody>()

  logger.log('getUserProfile', 'error', error)
  logger.log('getUserProfile', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('getUserProfile', 'responseParsed', responseParsed)

  return responseParsed
}

const postFeedbackCase: TPostFeedbackCase = async (postFeedbackCaseRequestBody, headerOption = {}) => {
  const keyPath = 'POST_FEEDBACK_CASE'
  const url = pgwBase(keyPath)
  const body = postFeedbackCaseRequestBody
  const headers = await header(headerOption)

  logger.log('postFeedbackCase', 'head', headers)
  logger.log('postFeedbackCase', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostFeedbackCaseResponseBody>()

  logger.log('postFeedbackCase', 'error', error)
  logger.log('postFeedbackCase', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postFeedbackCase', 'responseParsed', responseParsed)

  return responseParsed
}

const postTransactionRiskSummary: TPostTransactionRiskSummary = async (postTransactionRequestBody, headerOption = {}) => {
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

const postCreateOrder: TPostCreateOrder = async (postCreateOrderRequestBody, headerOption = {}) => {
  const keyPath = 'POST_CREATE_ORDER'
  const url = pgwBase(keyPath)
  const body = postCreateOrderRequestBody
  const headers = await header(headerOption)

  logger.log('postCreateOrder', 'head', headers)
  logger.log('postCreateOrder', 'body', body)

  const request = await post(url, payload(body, headers), onResponseErrorCode)
  const [error, response] = await request<IPostCreateOrderResponseBody>()

  logger.log('postCreateOrder', 'error', error)
  logger.log('postCreateOrder', 'response', response)

  if (error) {
    throw error
  }

  const responseParsed = pgwParser[keyPath](response)
  logger.log('postCreateOrder', 'responseParsed', responseParsed)

  return responseParsed
}

export default {
  postSignUp,
  getNonce,
  postLogin,
  postRenewToken,
  getAddressInfo,
  postInquiryId,
  getTransactionInquires,
  postTransactionRisks,
  getUserProfile,
  postFeedbackCase,
  postTransactionRiskSummary,
  postCreateOrder,
}
