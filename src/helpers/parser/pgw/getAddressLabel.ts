import type {
    TGetAddressLabel,
    IGetAddressLabelsLabelInfosBody,
    IGetAddressLabelsNotesBody,
    IGetAddressLabelsLabelsBody,
} from '../../../helpers/parser/pgw/types/getAddressLabel.type'
import { parserMapping } from '../../../helpers/parser/parser'
const getAddressLabel: TGetAddressLabel = (responseBody) => {
    const labelInfos = responseBody.label_infos?.map(convertToLabelInfoParsed) || []
    const notesResult = responseBody.notes?.map(convertToNotesParsed) || []
    return {
        address: parserMapping<string>(responseBody, 'address', ''),
        labelInfos,
        notes: notesResult,
    }
}

function convertToNotesParsed(labels: IGetAddressLabelsNotesBody): IGetAddressLabelsNotesBody {
    return {
        note: parserMapping<string>(labels, 'note', ''),
        source: parserMapping<string>(labels, 'source', ''),
    }
}

function convertToLabelInfoParsed(
    labelInfo: IGetAddressLabelsLabelInfosBody,
): IGetAddressLabelsLabelInfosBody {
    let labels = []
    if (labelInfo.labels != null && labelInfo.labels.length > 0) {
        labelInfo.labels.forEach(function (label) {
            labels.push(convertToLabelParsed(label))
        })
    }

    return {
        category: parserMapping<string>(labelInfo, 'category', ''),
        risk_level: parserMapping<number>(labelInfo, 'risk_level', ''),
        labels: labels,
    }
}

function convertToLabelParsed(labels: IGetAddressLabelsLabelsBody): IGetAddressLabelsLabelsBody {
    return {
        name: parserMapping<string>(labels, 'name', ''),
        source: parserMapping<string>(labels, 'source', ''),
    }
}
export default getAddressLabel
