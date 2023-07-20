export interface IGetNonceResponseBody {
    nonce: string
}
  
export interface IGetNonceResponseParsed {
    nonce: string
}
  
export type TGetNonce = (responseBody: IGetNonceResponseBody) => IGetNonceResponseParsed
  