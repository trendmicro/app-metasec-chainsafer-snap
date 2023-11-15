import { panel, text } from '@metamask/snaps-ui'
import { TRiskPanel } from './types/panels.type'
import { apiMapping, headingText, riskIconMapping, serviceError } from '../../constants/content'

export const convertToRiskPanel: TRiskPanel = (result, error) => {
    if (error) {
        return panel([
            text(`${headingText.riskFactor}`),
            text(`${serviceError.serviceError}`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    return panel([
        text(`${headingText.riskFactor}`),
        ...result.factors.map((insight) =>
            panel([
                text(
                    `${riskIconMapping.transaction_risk_type[insight.type]} ${
                        apiMapping.transaction_risks[insight.name]
                    }`
                ),
            ])
        ),
    ])
}
