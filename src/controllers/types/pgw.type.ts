import type { IPostTransactionRisksResponseParsed } from '../../helpers/parser/pgw/types/postTransactionRisks.type'
import type { IPostTransactionRiskSummaryResponseParsed } from '../../helpers/parser/pgw/types/postTransactionRiskSummary.type'
import type {
    IPostTransactionSimulationResponseParsed,
    IPostTransactionSimulationRequestPayload,
} from '../../helpers/parser/pgw/types/postTransactionSimulation.type'
import type { IGetSnapLatestVersionResponseParsed } from '../../helpers/parser/pgw/types/getSnapLatestVersion.type'
import type { TRestructuredPayload } from '../../helpers/types/proxyRestructure.type'
import type { IResponseError } from '../../controllers/types/http.type'
import type { IGetTokenInfoResponseParsed } from '../../helpers/parser/pgw/types/getTokenInfo.type'
import type { IGetAddressLabelResponseParsed } from '../../helpers/parser/pgw/types/getAddressLabel.type'
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

export type TGetSnapLatestVersion = (
    headerOption?: Record<string, string>
) => Promise<IGetSnapLatestVersionResponseParsed>

export type TGetTokenInfo = (
    contractAddress: string,
    headerOption?: Record<string, string>
) => Promise<IGetTokenInfoResponseParsed>

export type TGetAddressLabel = (
    contractAddress: string,
    headerOption?: Record<string, string>
) => Promise<IGetAddressLabelResponseParsed>
