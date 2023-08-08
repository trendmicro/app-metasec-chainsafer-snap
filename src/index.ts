import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types'
import { panel, copyable, divider, heading, text } from '@metamask/snaps-ui'
import { ENV, API } from './constants/config'
import Logger from './controllers/logger'
import { sendTransactionRisk } from './controllers/mockApi'
import {
  postTransactionRisk,
  postTransactionSimulation,
  postTransactionRiskSummary,
} from './controllers/chainsafer'
import { IResponseError } from './controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from './helpers/parser/pgw/types/postTransactionRisks.type'
import { ApiMapping, SnapContentMapping } from './locales/pages'
import { IPostTransactionSimulationResponseParsed } from './helpers/parser/pgw/types/postTransactionSimulation.type'
import { IPostTransactionRiskSummaryResponseParsed } from './helpers/parser/pgw/types/postTransactionRiskSummary.type'

const logger = new Logger('[src.index]')
export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  chainId,
  transaction,
}) => {
  console.log('transactionOrigin:', transactionOrigin)
  console.log('chainId:', chainId)
  console.log('transaction:', transaction)

  if (transaction) {
    const [riskSummaryResult, riskSummaryError] = await postTransactionRiskSummary(
      transactionOrigin,
      transaction
    )
    const [riskResult, riskError] = await postTransactionRisk(transactionOrigin, transaction)
    const [simulationResult, simulationError] = await postTransactionSimulation(transaction)
    return {
      content: panel([
        convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError),
        convertToRiskPanel(riskResult, riskError),
        convertToSimulationPanel(simulationResult, simulationError),
      ]),
    }
  } else {
    return {
      content: panel([text(`⛔️**Oops, transaction is null**!😬`)]),
    }
  }
}

function convertToRiskSummaryPanel(
  result: IPostTransactionRiskSummaryResponseParsed,
  error: IResponseError
) {
  if (error) {
    return panel([
      text(`⛔️**Oops, service have something problems...**!😬`),
      text(`${JSON.stringify(error)}`),
    ])
  } else {
    return panel([
      heading(`${SnapContentMapping.transaction_risk_summary[result.severity]} ${ApiMapping.pages.transaction_risk[result.severity]}`),
      text(`**${ApiMapping.api.transaction_risks_summary[result.ruleName]}**`),
      divider(),
    ])
  }
}

function convertToRiskPanel(result: IPostTransactionRisksResponseParsed, error: IResponseError) {
  console.log('Transaction Risk error:', error, error != ({} as IResponseError))
  if (error) {
    return panel([
      text(`⛔️**Oops, service have something problems...**!😬`),
      text(`${JSON.stringify(error)}`),
    ])
  }

  return panel([
    ...result.factors.map((insight) =>
      panel([
        text(
          `${SnapContentMapping.transaction_risk_type[insight.type]} ${
            ApiMapping.api.transaction_risks[insight.name]
          }`
        ),
        // text(`💬 ${insight.message}`),
      ])
    ),
  ])
}

function convertToSimulationPanel(
  result: IPostTransactionSimulationResponseParsed,
  error: IResponseError
) {
  if (error) {
    return panel([
      heading('Transaction Simulation'),
      divider(),
      text(`⛔️**Oops, service have something problems...**!😑`),
      text(`${JSON.stringify(error)}`),
    ])
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
      text(
        `**From Address Balance Original:** ${JSON.stringify(
          result.simulationResult.fromAddressBalanceOriginal
        )}`
      ),
      text(
        `**From Address Balance Diff:** ${JSON.stringify(
          result.simulationResult.fromAddressBalanceDiff
        )}`
      ),
      text(
        `**To Address Balance Original:** ${JSON.stringify(
          result.simulationResult.toAddressBalanceOriginal
        )}`
      ),
      text(
        `**To Address Balance Diff:** ${JSON.stringify(
          result.simulationResult.toAddressBalanceDiff
        )}`
      ),
      text(`**Signature Function:** ${JSON.stringify(result.simulationResult.signatureFunction)}`),
      text(
        `**Transfer Token Address:** ${JSON.stringify(
          result.simulationResult.transferTokenAddress
        )}`
      ),
    ]),
  ])
}

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      const [result, error] = await sendTransactionRisk()
      logger.log('sendTransactionRisk', { result, error })
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text(`Hello, **${origin}**!😑🫨😬`),
            divider(),
            heading('Envirment Variables'),
            text(`ENV: ${ENV}`),
            text(`API PGW BASE: ${API.PGW.base}`),
            divider(),
            heading('Params From Dapp'),
            copyable(`${origin}`),
            text(`${JSON.stringify(request.params)}`),
            divider(),
            heading('Response From PGW'),
            text(`Result: ${JSON.stringify(result)}`),
            text(`Error: ${JSON.stringify(error)}`),
          ]),
        },
      })
    default:
      throw new Error('Method not found.')
  }
}
