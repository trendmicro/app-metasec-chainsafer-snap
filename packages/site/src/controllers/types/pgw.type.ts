import type { IPostSignUpResponseParsed, TSignUpRequestPayload } from 'helpers/parser/pgw/types/postSignUp.type'
import type { IGetNonceResponseParsed } from 'helpers/parser/pgw/types/getNonce.type'
import type { IPostLoginResponseParsed, TLoginRequestPayload } from 'helpers/parser/pgw/types/postLogin.type'
import type { IPostRenewTokenResponseParsed, TRenewTokenRequestPayload } from 'helpers/parser/pgw/types/postRenewToken.type'
import type { IGetAddressInfoResponseParsed } from 'helpers/parser/pgw/types/getAddressInfo.type'
import type { IPostInquiryIdResponseParsed } from 'helpers/parser/pgw/types/postInquiryId.type'
import type { IGetTransactionInquiresResponseParsed } from 'helpers/parser/pgw/types/getTransactionInquires.type'
import type { IPostTransactionRisksResponseParsed } from 'helpers/parser/pgw/types/postTransactionRisks.type'
import type { IPostPostFeedbackCaseResponseParsed, TFeedbackCaseRequestPayload } from 'helpers/parser/pgw/types/postFeedbackCase.type'
import type { IPostTransactionRiskSummaryResponseParsed } from 'helpers/parser/pgw/types/postTransactionRiskSummary.type'
import type { IGetUserProfileResponseParsed } from 'helpers/parser/pgw/types/getUserProfile.type'
import type { TRestructuredPayload } from 'helpers/types/proxyRestructure.type'
import type { IPostCreateOrderResponseParsed, TCreateOrderRequestPayload } from 'helpers/parser/pgw/types/postCreateOrder.type'
import type { IResponseError } from 'controllers/types/http.type'

export type TOnResponseErrorCode = (response: any, responseBody: any) => IResponseError;
export type TPostSignUp = (postSignUpRequestBody: TSignUpRequestPayload, headerOption?: Record<string, string>) => Promise<IPostSignUpResponseParsed>
export type TGetNonce = (address: string, headerOption?: Record<string, string>) => Promise<IGetNonceResponseParsed>
export type TPostLogin = (postLoginRequestBody: TLoginRequestPayload, headerOption?: Record<string, string>) => Promise<IPostLoginResponseParsed>
export type TPostRenewToken = (postRenewTokenRequestBody: TRenewTokenRequestPayload, headerOption?: Record<string, string>) => Promise<IPostRenewTokenResponseParsed>
export type TGetAddressInfo = (address: string, headerOption?: Record<string, string>) => Promise<IGetAddressInfoResponseParsed>
export type TPostInquiryId = (postInquiryRequestBody: TRestructuredPayload, headerOption?: Record<string, string>) => Promise<IPostInquiryIdResponseParsed>
export type TGetTransactionInquires = (inquiryId: string, headerOption?: Record<string, string>) => Promise<IGetTransactionInquiresResponseParsed>
export type TPostTransactionRisks = (postTransactionRequestBody: TRestructuredPayload, headerOption?: Record<string, string>) => Promise<IPostTransactionRisksResponseParsed>
export type TPostFeedbackCase = (postFeedbackcaseRequestBody: TFeedbackCaseRequestPayload, headerOption?: Record<string, string>) => Promise<IPostPostFeedbackCaseResponseParsed>
export type TPostTransactionRiskSummary = (postTransactionRequestBody: TRestructuredPayload, headerOption?: Record<string, string>) => Promise<IPostTransactionRiskSummaryResponseParsed>
export type TPostCreateOrder = (postCreateOrderRequestBody: TCreateOrderRequestPayload, headerOption?: Record<string, string>) => Promise<IPostCreateOrderResponseParsed>
export type TGetUserProfile = (username: string, headerOption?: Record<string, string>) => Promise<IGetUserProfileResponseParsed>