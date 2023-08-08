import type { TPostFeedbackCase } from '../../../helpers/parser/pgw/types/postFeedbackCase.type'

import { parserMapping } from '../../../helpers/parser/parser'

const postFeedbackCase: TPostFeedbackCase = (responseBody) => {
  return {
    caseId: parserMapping<string>(responseBody, 'case_id', ''),
  }
}

export default postFeedbackCase
