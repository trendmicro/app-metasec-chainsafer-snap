export type TRiskType = 'severe_risk' | 'minor_risk' | 'attention_required'
export interface IPostTransactionRisksResponseBodyItem {
    name: string
    factor_type: TRiskType
    message: string
    labels: string[]
}

export interface IPostTransactionRisksResponseBody {
    factors: IPostTransactionRisksResponseBodyItem[]
}

export interface IPostTransactionRisksParsedItem {
    name: string
    type: TRiskType
    message: string
    labels: string[]
}
export interface IPostTransactionRisksResponseParsed {
    factors: IPostTransactionRisksParsedItem[]
}

export type TPostTransactionRisks = (
    responseBody: IPostTransactionRisksResponseBody
) => IPostTransactionRisksResponseParsed
