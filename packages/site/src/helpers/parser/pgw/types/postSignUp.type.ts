export interface TSignUpRequestPayload {
    eoa_address: string
}

export interface IPostSignUpResponseBody {}
  
export interface IPostSignUpResponseParsed {}
  
export type TPostSignUp = (responseBody: IPostSignUpResponseBody) => IPostSignUpResponseParsed
  