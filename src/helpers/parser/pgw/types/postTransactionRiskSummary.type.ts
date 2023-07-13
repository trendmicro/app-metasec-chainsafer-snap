export type TSeverityResponse = 'fatal_risk' | 'high_risk' | 'caution' | 'no_risk' | 'unknown'
export type TSeverityParsed = 'fatal_risk' | 'high_risk' | 'caution' | 'no_risk'

export interface IPostTransactionRiskSummaryResponseBody {
  rule_name: string
  severity: TSeverityResponse
}

export interface IPostTransactionRiskSummaryResponseParsed {
  ruleName: string
  severity: TSeverityParsed
}

export type TPostTransactionRiskSummary = (responseBody: IPostTransactionRiskSummaryResponseBody) => IPostTransactionRiskSummaryResponseParsed
