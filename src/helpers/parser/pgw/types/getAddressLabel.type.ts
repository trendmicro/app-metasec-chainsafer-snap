export interface IGetAddressLabelsResponseBody {
    address: string
    label_infos:IGetAddressLabelsLabelInfosBody[]
    notes:IGetAddressLabelsNotesBody[]

}

export interface IGetAddressLabelsLabelInfosBody {
    category: string
    labels: IGetAddressLabelsLabelsBody[]
}

export interface IGetAddressLabelsLabelsBody {
    name: string
    source: string
}

export interface IGetAddressLabelsNotesBody {
    note: string
    source: string
}

export interface IGetAddressLabelsLabelsResponseParsed{
    labelName: string
    sourceFrom: string
}

export interface IGetAddressLabelResponseParsed{
    address: string
    labelInfos:IGetAddressLabelsLabelInfosBody[]
    notes:IGetAddressLabelsNotesBody[]
}

export type TGetAddressLabel = (responseBody: IGetAddressLabelsResponseBody) => IGetAddressLabelResponseParsed