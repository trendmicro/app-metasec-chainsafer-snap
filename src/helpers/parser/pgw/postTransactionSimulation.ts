import type { TPostTransactionSimulation } from '../../../helpers/parser/pgw/types/postTransactionSimulation.type'

import { parserMapping } from '../../../helpers/parser/parser'

const postTransactionSimulation: TPostTransactionSimulation = (responseBody) => {
  return {
    evmErrAddress: parserMapping<string>(responseBody, 'evm_err_address', ''),
    evmErrMessage: parserMapping<string>(responseBody, 'evm_err_message', ''),
    fromAddress: parserMapping<string>(responseBody, 'from_address', ''),
    simulationResult: {
      fromAddressBalanceDiff: parserMapping<string>(responseBody.simulation_result, 'from_address_balance_diff', ''),
      fromAddressBalanceOriginal: parserMapping<string>(responseBody.simulation_result, 'from_address_balance_original', ''),
      signatureFunction: parserMapping<string>(responseBody.simulation_result, 'signature_function', ''),
      toAddressBalanceDiff: parserMapping<string>(responseBody.simulation_result, 'to_address_balance_diff', ''),
      toAddressBalanceOriginal: parserMapping<string>(responseBody.simulation_result, 'to_address_balance_original', ''),
      transferTokenAddress: parserMapping<string>(responseBody.simulation_result, 'transfer_token_address', ''),
    },
    toAddress: parserMapping<string>(responseBody, 'to_address', ''),
  }
}

export default postTransactionSimulation
