import type {
  TPostTransactionRisks,
  IPostTransactionRisksResponseBodyItem,
  IPostTransactionRisksParsedItem,
  TRiskType,
  IPostTransactionRisksResponseBody,
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
            labels: checkIfLabelsExists(responseBody, factors),
          }
        }) as IPostTransactionRisksParsedItem[]
      },
    ),
  }
}


export const checkIfLabelsExists = (
  responseBody: IPostTransactionRisksResponseBody,
  factor: IPostTransactionRisksResponseBodyItem[],
): string[] => {
  if (responseBody.hasOwnProperty('labels')) {
    return parserMapping<string[]>(factor, 'labels', [])
  }
  return []
}

export default postTransactionRisks
