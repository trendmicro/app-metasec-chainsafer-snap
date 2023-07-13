import type {
  TPostTransactionRisks,
  IPostTransactionRisksResponseBodyItem,
  IPostTransactionRisksParsedItem,
  TRiskType,
} from 'helpers/parser/pgw/types/postTransactionRisks.type'
import { parserMapping } from 'helpers/parser/parser'

export const postTransactionRisks: TPostTransactionRisks = (responseBody) => {
  return {
    factors: parserMapping<IPostTransactionRisksParsedItem[]>(
      responseBody,
      'factors',
      [],
      (factors: IPostTransactionRisksResponseBodyItem[]) => {
        return factors.map((factor) => {
          return {
            name: parserMapping<string>(factor, 'name', ''),
            type: parserMapping<TRiskType>(factor, 'factor_type', 'attention_required'),
            message: parserMapping<string>(factor, 'message', ''),
            labels: parserMapping<string[]>(factor, 'labels', []),
          }
        }) as IPostTransactionRisksParsedItem[]
      },
    ),
  }
}

export default postTransactionRisks
