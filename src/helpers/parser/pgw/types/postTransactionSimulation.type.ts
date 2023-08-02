export interface IPostTransactionSimulationRequestPayload {
  data: string | null
  from: string
  gas: string
  to: string
  value: string | null
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
  from_address: string
  simulation_result: IPostTransactionSimulationResult
  to_address: string
}

export interface IPostTransactionSimulationResponseParsed {
  evmErrAddress: string
  evmErrMessage: string
  fromAddress: string
  simulationResult: IPostTransactionSimulationResultResponseParsed
  toAddress: string
}
export interface IPostTransactionSimulationResultResponseParsed {
  fromAddressBalanceDiff: string
  fromAddressBalanceOriginal: string
  signatureFunction: string
  toAddressBalanceDiff: string
  toAddressBalanceOriginal: string
  transferTokenAddress: string
}

export type TPostTransactionSimulation = (responseBody: IPostTransactionSimulationResponseBody) => IPostTransactionSimulationResponseParsed