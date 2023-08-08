import pgw from './pgw'
import Logger from './logger'
import { proxyConvertToPayload } from './../helpers/proxyRestructure'
import { ISendTransactionProxyPayload } from './../helpers/types/proxyRestructure.type'
import { IResponseError } from './../controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from './../helpers/parser/pgw/types/postTransactionRisks.type'
import { IPostTransactionSimulationRequestPayload, IPostTransactionSimulationResponseParsed } from './../helpers/parser/pgw/types/postTransactionSimulation.type'
import { Json } from '@metamask/snaps-types'

const logger = new Logger('[snap]')

export const postTransactionRisk = async (original: string, transaction: Json): Promise<
  [IPostTransactionRisksResponseParsed, IResponseError]
> => {
  let result: IPostTransactionRisksResponseParsed = {} as IPostTransactionRisksResponseParsed
  let error: IResponseError = null

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
    logger.error(`${JSON.stringify(e)}`)
    error = e
  }

  return [result, error]
}

export const postTransactionSimulation = async (original: string, transaction: Json): Promise<
  [IPostTransactionSimulationResponseParsed, IResponseError]
> => {
  let result: IPostTransactionSimulationResponseParsed = {} as IPostTransactionSimulationResponseParsed
  let error: IResponseError = null

  let payload = {
    data: transaction["data"] || "",
    from: transaction["from"] || "",
    to: transaction["to"] || "",
    gas: parseInt(transaction["gas"], 16).toString() || "",
    value: parseInt(transaction["value"], 16).toString() || "",
  } as IPostTransactionSimulationRequestPayload

  try {
    result = await pgw.postTransactionSimulation(payload)
  } catch (e) {
    logger.error(`${ JSON.stringify(e) }`)
    error = e
  }

  return [result, error]
}
