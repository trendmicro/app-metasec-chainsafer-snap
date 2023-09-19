import type { IPostTransactionRisksResponseParsed } from '../../helpers/parser/pgw/types/postTransactionRisks.type'
import type { IPostTransactionRiskSummaryResponseParsed } from '../../helpers/parser/pgw/types/postTransactionRiskSummary.type'
import type {
    IPostTransactionSimulationResponseParsed,
    IPostTransactionSimulationRequestPayload,
} from '../../helpers/parser/pgw/types/postTransactionSimulation.type'
import type { TRestructuredPayload } from '../../helpers/types/proxyRestructure.type'
import type { IResponseError } from '../../controllers/types/http.type'

export type TOnResponseErrorCode = (response: any, responseBody: any) => IResponseError
export type TPostTransactionRisks = (
    postTransactionRequestBody: TRestructuredPayload,
    headerOption?: Record<string, string>
) => Promise<IPostTransactionRisksResponseParsed>
export type TPostTransactionRiskSummary = (
    postTransactionRequestBody: TRestructuredPayload,
    headerOption?: Record<string, string>
) => Promise<IPostTransactionRiskSummaryResponseParsed>
export type TPostTransactionSimulation = (
    postTransactionRequestBody: IPostTransactionSimulationRequestPayload,
    headerOption?: Record<string, string>
) => Promise<IPostTransactionSimulationResponseParsed>
