export interface IPostTransactionSimulationRequestPayload {
  network_id: string
  from: string
  to: string
  call_data: string
  value?: number
  gas: number
}

export interface IPostTransactionSimulationResult {
  from_address_balance_diff: string
  from_address_balance_original: string
  signature_function: string
  to_address_balance_diff: string
  to_address_balance_original: string
  transfer_token_address: string
}

export interface IPostTransactionSimulationResponseBody {
  evm_err_address: string
  evm_err_message: string
  has_simulation_result: boolean
  txn_method_name: string
  from_address: string
  to_address: string
  sender_asset_change: IPostTransactionSimulationAssetChangeBody
  recipient_asset_changes: IPostTransactionSimulationAssetChangeBody[]
  contracts: IPostTransactionSimulationContractBody[]
}

export interface IPostTransactionSimulationAssetChangeBody {
  address: string
  balance_diff: IPostTransactionSimulationBalanceDiffBody
  token_changes: IPostTransactionSimulationTokenChangeBody[]
}

export interface IPostTransactionSimulationTokenChangeBody {
  direction: string
  type: string
  contract_address: string
  symbol: string
  name: string
  icon: string
  decimals: number
  dollar_value: string
  description: string
  token_id: number
}

export interface IPostTransactionSimulationBalanceDiffBody {
  origin: string
  after: string
  origin_dollar_value: string
  after_dollar_value: string
  symbol: string
  name: string
  icon: string
  decimals: number
}

export interface IPostTransactionSimulationContractBody {
  address: string
  contract_name: string
  is_public: boolean
  fee: string
  fee_dollar_value: string
}

export interface IPostTransactionSimulationResponseParsed {
  evmErrAddress: string
  evmErrMessage: string
  hasSimulationResult: boolean
  txnMethodName: string
  fromAddress: string
  toAddress: string
  senderAssetChange: IPostTransactionSimulationAssetChangeParsed
  recipientAssetChanges: IPostTransactionSimulationAssetChangeParsed[]
  contracts: IPostTransactionSimulationContractParsed[]
}

export interface IPostTransactionSimulationAssetChangeParsed {
  address: string
  balanceDiff: IPostTransactionSimulationBalanceDiffParsed
  tokenChanges: IPostTransactionSimulationTokenChangeParsed[]
}

export interface IPostTransactionSimulationTokenChangeParsed {
  direction: string
  type: string
  contractAddress: string
  symbol: string
  name: string
  icon: string
  decimals: number
  dollarValue: string
  description: string
  tokenId: number
}

export interface IPostTransactionSimulationBalanceDiffParsed {
  origin: string
  after: string
  originDollarValue: string
  afterDollarValue: string
  symbol: string
  name: string
  icon: string
  decimals: number
}

export interface IPostTransactionSimulationContractParsed {
  address: string
  contractName: string
  isPublic: boolean
  fee: string
  feeDollarValue: string
}

export type TPostTransactionSimulation = (responseBody: IPostTransactionSimulationResponseBody) => IPostTransactionSimulationResponseParsed