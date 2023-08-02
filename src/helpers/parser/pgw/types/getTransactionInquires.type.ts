export interface IGetTransactionInquiresResponseBodyItem {
  category: 'web2' | 'web3'
  address: string
  key: string
  value: any
}

export interface IGetTransactionInquiresResponseBody {
  results: IGetTransactionInquiresResponseBodyItem[]
}

export interface IGetTransactionInquiresResponseParsed {
  web2: Record<string, any>
  web3: IWeb3ParsedItem[]
}

export interface IWeb3ParsedItem {
  key: string
  address: string
  value: any
}

export type TGetTransactionInquires = (responseBody: IGetTransactionInquiresResponseBody) => IGetTransactionInquiresResponseParsed
