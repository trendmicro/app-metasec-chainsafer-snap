import { heading, divider, panel, text } from '@metamask/snaps-ui'
import { TProjectInsightPanel } from './types/panels.type'
import { headingText, serviceError } from '../../constants/content'
export const covertToProjectInsightPanel: TProjectInsightPanel = (result, error) => {
    if (error) {
        return panel([
            heading(serviceError.riskApiError),
            divider(),
            text(serviceError.riskApiErrorDetail),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (
        result == null ||
        Object.keys(result).length == 0 ||
        (result.BlueCheckMark != null && Object.keys(result).length == 1)
    ) {
        return panel([])
    }

    const arrayFromObject = Object.keys(result)

    return panel([
        heading(headingText.projectInsightPanel),
        divider(),
        ...arrayFromObject
            .filter((key) => key != 'BlueCheckMark')
            .map((key) => {
                return text(`${result[key]}`)
            }),
    ])
}
