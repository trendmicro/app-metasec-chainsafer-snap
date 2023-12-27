import { heading, divider, panel, text } from '@metamask/snaps-sdk'
import { headingText, serviceError } from '../../constants/content'
import { TProjectInsightPanel } from './types/panels.type'
export const covertToProjectInsightPanel: TProjectInsightPanel = (result, error) => {
    if (error) {
        return panel([])
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
