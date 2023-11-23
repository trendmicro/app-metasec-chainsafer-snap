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
import { convertAdPanel } from './panels/adPanel'
import { supportChainIds } from '../constants/config'

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

        const adDisplayPanel = convertAdPanel()

        const [[riskSummaryResult, riskSummaryError], [riskResult, riskError]] = await Promise.all([
            postTransactionRiskSummary(transactionOrigin, transaction),
            postTransactionRisk(transactionOrigin, transaction),
        ])
        let simulationPanel = panel([])
        let projectInsightPanel = panel([])
        const networkId =
            chainId.length > 0 && chainId.split(':').length == 2 ? chainId.split(':')[1] : ''
        
        if (supportChainIds.includes(networkId)) {
            const [simulationResult, simulationError] = await postTransactionSimulation(
                chainId,
                transaction
            )
            const [tokenInfoResult, tokenInfoError] = await getTokenInfoBySimulationResult(
                simulationResult
            )
            simulationPanel = await convertToSimulationPanel(
                simulationResult,
                simulationError
            )
            projectInsightPanel = covertToProjectInsightPanel(tokenInfoResult, tokenInfoError)
        } else {
            simulationPanel = panel([divider(), text(serviceError.unsupportedChainId), divider()])
        }

        let riskPanel = convertToRiskPanel(riskResult, riskError)
        let riskSummaryPanel = convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError)

        let displayPanel = panel([])

        if (riskSummaryResult.severity == 'caution') {
            displayPanel = panel([
                adDisplayPanel,
                updateAlert.panel,
                simulationPanel,
                riskSummaryPanel,
                riskPanel,
                projectInsightPanel,
            ])
        } else {
            displayPanel = panel([
                adDisplayPanel,
                updateAlert.panel,
                riskSummaryPanel,
                riskPanel,
                simulationPanel,
                projectInsightPanel,
            ])
        }

        return {
            content: displayPanel,
        }
    }

    return { content: panel([text(`${serviceError.serviceError}`)]) }
}