export interface TScamTargets {
  address: string
  url: string
}

export interface TFeedbackCaseRequestPayload {
  comment: string
  scam_type: string
  lost_asset: boolean
  targets: TScamTargets
}

export interface IPostFeedbackCaseResponseBody {
  case_id: string
}

export interface IPostPostFeedbackCaseResponseParsed {
  caseId: string
}

export type TPostFeedbackCase = (responseBody: IPostFeedbackCaseResponseBody) => IPostPostFeedbackCaseResponseParsed
