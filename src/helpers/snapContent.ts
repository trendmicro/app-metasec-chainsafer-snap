import {
    postTransactionRisk,
    postTransactionSimulation,
    postTransactionRiskSummary,
    getSnapLatestVersion,
    getTokenInfoBySimulationResult,
} from '../controllers/chainsafer'
import { panel, divider, text } from '@metamask/snaps-ui'
import { serviceError } from '../constants/content'
import { TTransactionInsightLayout } from './types/snapContent.type'
import { TUpdateAlert } from './panels/types/panels.type'
import { convertToUpdateAlertPanel } from './panels/updateAlertPanel'
import { convertToRiskPanel } from './panels/riskPanel'
import { convertToRiskSummaryPanel } from './panels/riskSummaryPanel'
import { convertToSimulationPanel } from './panels/simulationPanel'
import { covertToProjectInsightPanel } from './panels/projectInsightPanel'
import { convertToTransactionMethodPanel } from './panels/transactionMethodPanel'
import { convertToRecipientsPanel } from './panels/recipientsPanel'
export const transactionInsightLayout: TTransactionInsightLayout = async ({
    transactionOrigin,
    chainId,
    transaction,
}) => {
    if (transaction) {
        const [latestVersionResult, latestVersionError] = await getSnapLatestVersion()

        const updateAlert: TUpdateAlert = convertToUpdateAlertPanel(
            latestVersionResult,
            latestVersionError
        )

        if (updateAlert.isForceUpdate) {
            // snap need force update early return
            return {
                content: updateAlert.panel,
            }
        }

        const [
            [riskSummaryResult, riskSummaryError],
            [riskResult, riskError],
            [simulationResult, simulationError],
        ] = await Promise.all([
            postTransactionRiskSummary(transactionOrigin, transaction),
            postTransactionRisk(transactionOrigin, transaction),
            postTransactionSimulation(chainId, transaction),
        ])

        const [tokenInfoResult, tokenInfoError] = await getTokenInfoBySimulationResult(
            simulationResult
        )
        
        let riskPanel = convertToRiskPanel(riskResult, riskError)
        let riskSummaryPanel = convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError)
        let simulationPanel = convertToSimulationPanel(simulationResult, simulationError, tokenInfoResult && tokenInfoResult.BlueCheckMark)
        let projectInsightPanel = covertToProjectInsightPanel(tokenInfoResult, tokenInfoError)
        let transactionMethodPanel = convertToTransactionMethodPanel(simulationResult, simulationError)
        let recipientsPanel = convertToRecipientsPanel()
        let displayPanel = panel([])
        if (riskSummaryResult.severity == 'caution') {
            displayPanel = panel([
                updateAlert.panel,
                simulationPanel,
                riskSummaryPanel,
                divider(),
                riskPanel,
                divider(),
                transactionMethodPanel,
                divider(),
                recipientsPanel,
                divider(),
                projectInsightPanel,
            ])
        } else {
            displayPanel = panel([
                updateAlert.panel,
                riskSummaryPanel,
                divider(),
                riskPanel,
                divider(),
                transactionMethodPanel,
                divider(),
                simulationPanel,
                recipientsPanel,
                divider(),
                projectInsightPanel,
            ])
        }

        return {
            content: displayPanel,
        }
    }

    return { content: panel([text(`${serviceError.serviceError}`)]) }
}
