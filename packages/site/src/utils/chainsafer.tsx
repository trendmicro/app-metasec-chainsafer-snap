import { signSignature } from './metamask'
import { useContext } from 'react'
import { MetaMaskContext, MetamaskActions } from 'hooks'
import pgw from 'controllers/pgw'
import Logger from 'controllers/logger'
import { IResponseError } from 'controllers/types/http.type'
import { IGetNonceResponseParsed } from 'helpers/parser/pgw/types/getNonce.type'
import { IPostLoginResponseParsed } from 'helpers/parser/pgw/types/postLogin.type'
import storage from 'controllers/storage'

const logger = new Logger('[snap]')

export const sendCurrentAccountToLogin = async (account: string) => {
  console.log('sendLatestSignUpAccountLogin: ', account)

  let nonceResp: IGetNonceResponseParsed = {} as IGetNonceResponseParsed
  let login: IPostLoginResponseParsed = {} as IPostLoginResponseParsed
  let error: IResponseError = {} as IResponseError
  try {
    await pgw.postSignUp({
      eoa_address: account,
    })
  } catch (e) {
    if (e.httpStatusCode != 409) {
      error = e
      logger.error(`${JSON.stringify(error)}`)
      throw error
    }
  }

  try {
    nonceResp = await pgw.getNonce(account)
  } catch (e) {
    error = e
    logger.error(`${JSON.stringify(error)}`)
    throw error
  }

  let signature = await signSignature(account, nonceResp.nonce)

  try {
    login = await pgw.postLogin({
      eoa_address: account,
      signature: signature,
    })
  } catch (e) {
    error = e
    logger.error(`${JSON.stringify(error)}`)
    throw error
  }

  storage.set('loginedAccount', account)
  storage.set('username', login.username)
  storage.set('accessToken', login.accessToken)
  storage.set('refreshToken', login.refreshToken)
  storage.set('expiresIn', `${login.expiresIn}`)

  return () => getTokenFromStorage()
}

export const getTokenFromStorage = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  const refreshToken = window.localStorage.getItem('refreshToken')
  const username = window.localStorage.getItem('username')
  const expiresIn = window.localStorage.getItem('expiresIn')
  const loginedAccount = window.localStorage.getItem('loginedAccount')
  return { accessToken, refreshToken, username, expiresIn, loginedAccount }
}

export const clearTokenFromStorage = async () => {
  
}
