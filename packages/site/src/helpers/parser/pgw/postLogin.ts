import type {
    TPostLogin
  } from 'helpers/parser/pgw/types/postLogin.type'
  
import { parserMapping } from 'helpers/parser/parser'

const postLogin: TPostLogin = (responseBody) => {
  return {
    username: parserMapping<string>(responseBody, 'username', ''),
    accessToken: parserMapping<string>(responseBody, 'access_token', ''),
    refreshToken: parserMapping<string>(responseBody, 'refresh_token', ''),
    expiresIn: parserMapping<number>(responseBody, 'expires_in', ''),
  }
}

export default postLogin