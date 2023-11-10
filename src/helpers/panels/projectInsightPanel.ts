import { heading, divider, panel, text } from '@metamask/snaps-ui'
import { headingText, serviceError } from '../../constants/content'
import { TProjectInsightPanel } from './types/panels.type'
export const covertToProjectInsightPanel: TProjectInsightPanel = (result, error) => {
    if (error) {
        return panel([
            heading(serviceError.riskApiError),
            divider(),
            text(serviceError.riskApiErrorDetail),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    const arrayFromObject = Object.keys(result)

    return panel([
        heading(headingText.projectInsightPanel),
        divider(),
        ...arrayFromObject.map((key) => {
            return text(`${key}: ${result[key]}`)
        }),
    ])
}
