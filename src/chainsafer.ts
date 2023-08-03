import pgw from './controllers/pgw'
import Logger from './controllers/logger'
import { proxyConvertToPayload } from './helpers/proxyRestructure'
import { ISendTransactionProxyPayload } from './helpers/types/proxyRestructure.type'
import { IResponseError } from './controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from './helpers/parser/pgw/types/postTransactionRisks.type'
import { Json } from '@metamask/snaps-types'

const logger = new Logger('[snap]')

export const postTransactionRisk = async (original: string, transaction: Json) => {
  let result: IPostTransactionRisksResponseParsed = {} as IPostTransactionRisksResponseParsed
  let error: IResponseError = {} as IResponseError

  const txn = {
    method: 'eth_sendTransaction',
    url: original,
    params: [transaction],
  }

  try {
    result = await pgw.postTransactionRisks(
      proxyConvertToPayload(original, txn as ISendTransactionProxyPayload),
    )
  } catch (e) {
    logger.error(`${JSON.stringify(error)}`)
    throw e
  }

  return result
}
