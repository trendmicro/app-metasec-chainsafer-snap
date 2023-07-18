export interface TLoginRequestPayload {
    eoa_address: string
    signature: string
}

export interface IPostLoginResponseBody {
    username: string
    access_token: string
    refresh_token: string
    expires_in: number
}
  
export interface IPostLoginResponseParsed {
    username: string
    accessToken: string
    refreshToken: string
    expiresIn: number
}
  
export type TPostLogin = (responseBody: IPostLoginResponseBody) => IPostLoginResponseParsed
  