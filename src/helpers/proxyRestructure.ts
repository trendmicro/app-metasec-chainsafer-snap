import { ETHEREUM_METHOD } from '../constants/wallet'
import type {
  TProxyConvertToPayload,
  TRestructuredPayload,
  TRestructuredTxnParams,
} from './types/proxyRestructure.type'

import Logger from '../controllers/logger'

const logger = new Logger('[helpers.proxyRestructure]')
export const proxyConvertToPayload: TProxyConvertToPayload = (domain, proxyObj) => {
  const txn: TRestructuredTxnParams[] = []
  let method = ''
  if (proxyObj?.hasOwnProperty('method')) {
    method = proxyObj.method
  }

  if (ETHEREUM_METHOD.SEND_TRANSACTION === proxyObj?.method) {
    const entries = Object.entries(proxyObj?.params[0] || {})
    entries.map(([key, value]) => {
      txn.push({ name: key, value })
    })
  }

  // only metamask will have version postfix
  if (
    ETHEREUM_METHOD.SIGN === proxyObj?.method ||
    proxyObj?.method.includes(ETHEREUM_METHOD.SIGN_TYPED_DATA)
  ) {
    proxyObj?.params?.forEach((value, key) => {
      txn.push({ name: `${key}`, value })
    })
  }

  const restructured: TRestructuredPayload = {
    txn_method: method,
    url: domain,
    txn_params: txn,
  }
  logger.log('proxyConvertToPayload', restructured)
  return restructured
}
