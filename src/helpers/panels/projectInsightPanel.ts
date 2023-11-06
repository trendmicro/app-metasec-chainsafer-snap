import { heading, divider, panel, text } from '@metamask/snaps-ui'
import { TProjectInsightPanel } from './types/panels.type'

export const covertToProjectInsightPanel: TProjectInsightPanel = (result, error) => {
    if (error) {
        return panel([
            heading('Project Insight'),
            divider(),
            text(`⛔️**Oops, service have something problems...**!😑`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    const arrayFromObject = Object.keys(result)

    return panel([
        heading('Project Insight'),
        divider(),
        ...arrayFromObject.map((key) => {
            return text(`${key}: ${result[key]}`)
        }),
    ])
}
