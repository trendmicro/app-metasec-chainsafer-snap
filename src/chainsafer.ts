import pgw from './controllers/pgw'
import Logger from './controllers/logger'
import { proxyConvertToPayload } from './helpers/proxyRestructure'
import { ISendTransactionProxyPayload } from './helpers/types/proxyRestructure.type'
import { IResponseError } from './controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from './helpers/parser/pgw/types/postTransactionRisks.type'
import { IPostTransactionSimulationRequestPayload, IPostTransactionSimulationResponseParsed } from './helpers/parser/pgw/types/postTransactionSimulation.type'
import { Json } from '@metamask/snaps-types'
import { Panel, copyable, divider, heading, panel, spinner, text } from '@metamask/snaps-ui'

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
    return panel([heading('Transaction Risk'), divider(), text(`⛔️**Oops, service have something problems...**!😑🫨😬`), text(`${JSON.stringify(e)}`)])
  }

  return panel([
    heading('Transaction Risk'),
    divider(), 
    ...result.factors.map((insight) => 
      panel([
        text(`🚩Name: ${insight.name}`),
        text(`Type: ${insight.type}`),
        text(`💬Message: ${insight.message}`)
      ])
    ),
  ])
}

export const postTransactionSimulation = async (original: string, transaction: Json) => {
    let result: IPostTransactionSimulationResponseParsed = {} as IPostTransactionSimulationResponseParsed
    let error: IResponseError = {} as IResponseError
  
    let payload = {
        data: transaction["data"] || null,
        from: transaction["from"] || "",
        to: transaction["to"] || "",
        gas: parseInt(transaction["gas"], 16).toString() || "",
        value: parseInt(transaction["value"], 16).toString() || null,
    } as IPostTransactionSimulationRequestPayload
  
    try {
      result = await pgw.postTransactionSimulation(payload)
    } catch (e) {
      logger.error(`${JSON.stringify(error)}`)
      return panel([heading('Transaction Simulation'), divider(), text(`⛔️**Oops, service have something problems...**!😑🫨😬`), text(`${JSON.stringify(e)}`)]);
    }
  
    return panel([
      heading('Transaction Simulation'),
      divider(), 
      text(`**EVM Err Address:** ${JSON.stringify(result.evmErrAddress)}`),
      text(`**EVM Err Message:** ${JSON.stringify(result.evmErrMessage)}`),
      text(`**From Address:** ${JSON.stringify(result.fromAddress)}`),
      text(`**To Address:** ${JSON.stringify(result.toAddress)}`),
      panel([
        heading('Simulation'),
        divider(),
        text(`**From Address Balance Original:** ${JSON.stringify(result.simulationResult.fromAddressBalanceOriginal)}`),
        text(`**From Address Balance Diff:** ${JSON.stringify(result.simulationResult.fromAddressBalanceDiff)}`),
        text(`**To Address Balance Original:** ${JSON.stringify(result.simulationResult.toAddressBalanceOriginal)}`),
        text(`**To Address Balance Diff:** ${JSON.stringify(result.simulationResult.toAddressBalanceDiff)}`),
        text(`**Signature Function:** ${JSON.stringify(result.simulationResult.signatureFunction)}`),
        text(`**Transfer Token Address:** ${JSON.stringify(result.simulationResult.transferTokenAddress)}`),
      ]),
    ])
}
