export interface TRenewTokenRequestPayload {
    username: string
    refresh_token: string
}

export interface IPostRenewTokenResponseBody {
    access_token: string
    expires_in: number
}
  
export interface IPostRenewTokenResponseParsed {
    accessToken: string
    expiresIn: number
}
  
export type TPostRenewToken = (responseBody: IPostRenewTokenResponseBody) => IPostRenewTokenResponseParsed
  