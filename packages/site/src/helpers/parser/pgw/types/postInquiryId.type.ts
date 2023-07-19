export interface IPostInquiryIdResponseBody {
  inquiry_id: string
}

export interface IPostInquiryIdResponseParsed {
  inquiryId: string
}

export type TPostInquiryId = (
  responseBody: IPostInquiryIdResponseBody
) => IPostInquiryIdResponseParsed