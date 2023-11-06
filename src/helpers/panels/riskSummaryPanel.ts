import { panel, heading, text } from '@metamask/snaps-ui'
import { headingText, serviceError, riskIconMapping, apiMapping } from '../../constants/content'
import { TRiskSummaryPanel } from './types/panels.type'

export const convertToRiskSummaryPanel: TRiskSummaryPanel = (result, error) => {
    if (error) {
        return panel([
            heading(`${headingText.riskSummary}`),
            text(`${serviceError.serviceError}`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    return panel([
        heading(
            `${riskIconMapping.transaction_risks_summary[result.severity]} ${
                apiMapping.transaction_risks_summary[result.severity]
            }`
        ),
        text(`**${apiMapping.transaction_risks_summary[result.ruleName]}**`),
    ])
}
