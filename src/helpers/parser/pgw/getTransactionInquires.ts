import type { TGetTransactionInquires, IGetTransactionInquiresResponseParsed, IGetTransactionInquiresResponseBodyItem, IWeb3ParsedItem } from '../../../helpers/parser/pgw/types/getTransactionInquires.type'
import { parserMapping } from '../../../helpers/parser/parser'

export const getTransactionInquires: TGetTransactionInquires = (responseBody) => {
  let combineWeb2 = {}
  let combineWeb3: IWeb3ParsedItem[] = []
  parserMapping<IGetTransactionInquiresResponseParsed>(responseBody, 'results', [], (results: IGetTransactionInquiresResponseBodyItem[]) => {
    if (results.length != 0) {
      for (let item of results) {
        const category = parserMapping<string>(item, 'category', '')
        const address = parserMapping<string>(item, 'address', '')
        const key = parserMapping<string>(item, 'key', '')
        const value = parserMapping<any>(item, 'value', '')
        if (category === 'web2') {
          let web2ParsedItem = { [key]: value }
          combineWeb2 = { ...combineWeb2, ...web2ParsedItem }
        } else if (category === 'web3') {
          combineWeb3.push({
            key,
            address,
            value
          })
        }
      }
    }
  })
  return {
    web2: combineWeb2,
    web3: combineWeb3,
  }
}

export default getTransactionInquires
