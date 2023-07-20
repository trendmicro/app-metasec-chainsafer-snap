import type {
  TPostRenewToken
  } from 'helpers/parser/pgw/types/postRenewToken.type'
  
import { parserMapping } from 'helpers/parser/parser'

const postRenewToken: TPostRenewToken = (responseBody) => {
  return {
    accessToken: parserMapping<string>(responseBody, 'access_token', ''),
    expiresIn: parserMapping<number>(responseBody, 'expires_in', ''),
  }
}

export default postRenewToken