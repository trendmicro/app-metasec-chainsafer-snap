import { signSignature, getCurrentAccount } from './metamask';
import pgw from 'controllers/pgw';
import Logger from 'controllers/logger'
import { IResponseError } from 'controllers/types/http.type'
import { IGetNonceResponseParsed} from 'helpers/parser/pgw/types/getNonce.type'
import { IPostLoginResponseParsed, TLoginRequestPayload } from 'helpers/parser/pgw/types/postLogin.type'
import storage from 'controllers/storage';

const logger = new Logger('[snap]')

export const sendLogin = async () => {
    const username = '';
    const token = '';
    const refresh_token = '';
  
    const account = await getCurrentAccount();

    let nonceResp: IGetNonceResponseParsed = {} as IGetNonceResponseParsed
    let login: IPostLoginResponseParsed = {} as IPostLoginResponseParsed
    let error: IResponseError = {} as IResponseError
    try {
        await pgw.postSignUp({
            eoa_address: account
        })
    } catch (e) {
        error = e
        logger.error(`${JSON.stringify(error)}`)
        return [login, error]
    }

    try {
        nonceResp = await pgw.getNonce(account)
    } catch (e) {
        error = e
        logger.error(`${JSON.stringify(error)}`)
        return [login, error]
    }

    let signature = await signSignature(account, nonceResp.nonce)

    try {
        login = await pgw.postLogin({
            eoa_address: account,
            signature : signature,
        })
    } catch (e) {
        error = e
        logger.error(`${JSON.stringify(error)}`)
    }

    storage.set("username", login.username)
    storage.set("access_token", login.accessToken)
    storage.set("refresh_token", login.refreshToken)

    return [login, error]
};
