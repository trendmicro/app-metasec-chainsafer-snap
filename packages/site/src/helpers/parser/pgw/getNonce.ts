import type {
    TGetNonce
  } from 'helpers/parser/pgw/types/getNonce.type'
  
import { parserMapping } from 'helpers/parser/parser'

const getNonce: TGetNonce = (responseBody) => {
  return {
    nonce: parserMapping<string>(responseBody, 'nonce', ''),
  }
}

export default getNonce