import type { TPostInquiryId } from 'helpers/parser/pgw/types/postInquiryId.type'

import { parserMapping } from 'helpers/parser/parser'

const postInquiryId: TPostInquiryId = (responseBody) => {
  return {
    inquiryId: parserMapping<string>(responseBody, 'inquiry_id', ''),
  }
}

export default postInquiryId
