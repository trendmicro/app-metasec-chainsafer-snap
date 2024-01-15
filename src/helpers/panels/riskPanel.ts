import { panel, text, divider, heading } from '@metamask/snaps-sdk'
import { TRiskPanel } from './types/panels.type'
import { apiMapping, headingText, riskIconMapping, serviceError } from '../../constants/content'

export const convertToRiskPanel: TRiskPanel = (result, error) => {
    if (error) {
        return panel([
            heading(serviceError.riskApiError),
            text(serviceError.riskApiErrorDetail),
            text(`${JSON.stringify(error)}`),
            divider(),
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
                    `${riskIconMapping.transaction_risk_type[insight.type]} ${apiMapping.transaction_risks[insight.name]
                    }`,
                ),
            ]),
        ),
        divider(),
    ])
}
