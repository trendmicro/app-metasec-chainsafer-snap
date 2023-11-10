import { Panel } from '@metamask/snaps-ui'
import { IResponseError } from '../../../controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from '../../parser/pgw/types/postTransactionRisks.type'
import { IGetSnapLatestVersionResponseParsed } from '../../parser/pgw/types/getSnapLatestVersion.type'
import { IPostTransactionRiskSummaryResponseParsed } from '../../parser/pgw/types/postTransactionRiskSummary.type'
import { IPostTransactionSimulationResponseParsed } from '../../parser/pgw/types/postTransactionSimulation.type'
import { IGetTokenInfoResponseParsed } from '../../parser/pgw/types/getTokenInfo.type'

export type TUpdateAlert = { panel: Panel; isForceUpdate: boolean }
export type TUpdateAlertPanel = (
    result: IGetSnapLatestVersionResponseParsed,
    error: IResponseError
) => TUpdateAlert

export type TRiskPanel = (
    result: IPostTransactionRisksResponseParsed,
    error: IResponseError
) => Panel

export type TRiskSummaryPanel = (
    result: IPostTransactionRiskSummaryResponseParsed,
    error: IResponseError
) => Panel

export type TSimulationPanel = (
    result: IPostTransactionSimulationResponseParsed,
    error: IResponseError,
    isBlueMark: boolean
) => Panel

export type TProjectInsightPanel = (
    result: IGetTokenInfoResponseParsed,
    error: IResponseError
) => Panel
