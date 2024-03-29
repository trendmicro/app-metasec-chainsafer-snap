import { Copyable, Panel, Text, Heading, Divider, Spinner } from '@metamask/snaps-sdk'
import { IResponseError } from '../../../controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from '../../parser/pgw/types/postTransactionRisks.type'
import { IGetSnapLatestVersionResponseParsed } from '../../parser/pgw/types/getSnapLatestVersion.type'
import { IPostTransactionRiskSummaryResponseParsed } from '../../parser/pgw/types/postTransactionRiskSummary.type'
import {
    IPostTransactionSimulationResponseParsed,
    IPostTransactionSimulationTokenChangeParsed,
} from '../../parser/pgw/types/postTransactionSimulation.type'
import { IGetTokenInfoResponseParsed } from '../../parser/pgw/types/getTokenInfo.type'
import { IGetAddressLabelResponseParsed } from '../../parser/pgw/types/getAddressLabel.type'
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
    error: IResponseError
) => Promise<Panel>

export type TProjectInsightPanel = (
    result: IGetTokenInfoResponseParsed,
    error: IResponseError
) => Panel

export type TPaymentDetail = (tokenChanges: IPostTransactionSimulationTokenChangeParsed[]) => Promise<any[]>

export type TGetAddressLabel = (
    result: IGetAddressLabelResponseParsed,
    error: IResponseError
) => Panel
