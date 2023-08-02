export interface ISendTransactionProxyPayload{
  method: 'eth_sendTransaction',
  params: Record<string, string>[]
}

export interface ISignProxyPayload{
  method: 'eth_sign',
  params: string[]
}

export interface ISignTypedDataProxyPayload{
  //only metamask will have version postfix
  method: 'eth_signTypedData',
  params: string[]
}

export type TProxyObj = ISendTransactionProxyPayload
| ISignProxyPayload
| ISignTypedDataProxyPayload

export type TProxyConvertToPayload = (domain: string, proxyObj?: TProxyObj) => TRestructuredPayload

export type TRestructuredTxnParams = {
  name: string
  value: string | Record<string, string>
}

export type TRestructuredPayload = {
  txn_method: string
  url: string
  txn_params: TRestructuredTxnParams[]
}

