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
    // const [simulationResult, simulationError] = await postTransactionSimulation(transaction)

    let factors = {}
    riskResult.factors.forEach((factor, index) => {
      factors[factor.name] = ''
    })


    return {
      content: panel([
        panel([
          heading('Balance Changes'),
          text('-0.010000003 Ether'), // ${JSON.stringify( result.simulationResult.fromAddressBalanceDiff)}
          text('+14.324342342 (Token)'), // ${JSON.stringify( result.simulationResult.toAddressBalanceDiff)}
        ]),
        divider(),
        convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError),
        convertToRiskPanel(riskResult, riskError),
        divider(),
        // convertToSimulationPanel(simulationResult, simulationError),
        panel([
          heading('Transaction Insight'),
          text(`${factors.hasOwnProperty('factor_contract_not_public') ? `❌` : `✅`} Is Public Contract `),
        ]),
        divider(),
        panel([
          heading('Web Insight'),
          text(`**Domain Check:**`),
          text(`${factors.hasOwnProperty('factor_domain_short_create') ? `❌` : `✅`} ${ApiMapping.api.transaction_risks['factor_domain_short_create']}`),
          text(`${factors.hasOwnProperty('factor_domain_short_available') ? `❌` : `✅`} ${ApiMapping.api.transaction_risks['factor_domain_short_available']}`),
          text(`${factors.hasOwnProperty('factor_ssl_domain_mismatch') ? `❌` : `✅`} ${ApiMapping.api.transaction_risks['factor_ssl_domain_mismatch']}`),
          text(`**Certificate Check:**`),
          text(`${factors.hasOwnProperty('factor_ssl_short_create') ? `❌` : `✅`} ${ApiMapping.api.transaction_risks['factor_ssl_short_create']}`),
          text(`${factors.hasOwnProperty('factor_ssl_short_available') ? `❌` : `✅`} ${ApiMapping.api.transaction_risks['factor_ssl_short_available']}`),
          text(`${factors.hasOwnProperty('factor_url_ai_scam') ? `❌` : `✅`} **AI Scam Detected**`),
          text(`${factors.hasOwnProperty('factor_url_blocklist') ? `❌` : `✅`} **Malicious Detected**`),
        ]),
        divider(),
        panel([
          heading(`Account/Project Insight`),
          text(`**Token Name:** #9656`),
          text(`**Official Website:** `), copyable(`https://boredapeyachtclub.com/#/`),
          text(`**Twitter:** `), copyable(`https://twitter.com/BoredApeYC`),
          text(`**Instagram:** `), copyable(`https://www.instagram.com/boredapeyachtclub/reels/`),
          text(`**Facebook:** `), copyable(`https://www.facebook.com/groups/166513018615984/`),
          text(`**Discord:** `), copyable(`https://discord.com/invite/3P5K3dzgdB`),
          text(`**OpenSea:** `), copyable(`https://opensea.io/collection/boredapeyachtclub`),
        ]),
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
          `${SnapContentMapping.transaction_risk_type[insight.type]} ${ApiMapping.api.transaction_risks[insight.name]
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
    text(
      `**From Address Balance Diff:** ${JSON.stringify(
        result.simulationResult.fromAddressBalanceDiff
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
