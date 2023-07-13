import type {
  TSeverityParsed,
  TPostTransactionRiskSummary,
} from 'helpers/parser/pgw/types/postTransactionRiskSummary.type'

import { parserMapping } from 'helpers/parser/parser'

const postTransactionRiskSummary: TPostTransactionRiskSummary = (responseBody) => {
  if (responseBody.rule_name === '' && responseBody.severity === 'unknown') {
    return {
      ruleName: '',
      severity: 'no_risk',
    }
  }
  return {
    ruleName: parserMapping<string>(responseBody, 'rule_name', '', (name: string) => {
      return `rule_${name}`
    }),
    severity: parserMapping<TSeverityParsed>(responseBody, 'severity', 'no_risk'),
  }
}

export default postTransactionRiskSummary
