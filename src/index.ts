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
      factors[factor.name] = factor.type
    })

    let riskPanel = convertToRiskPanel(riskResult, riskError)
    let riskSummaryPanel = convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError)
    let simulationPanel = convertToSimulationPanel(null, null)
    let projectPanel = convertToProjectPanel()

    let displayPanel = panel([])
    if (riskSummaryResult.severity == "caution") {
      displayPanel = panel([
        simulationPanel,
        divider(),
        riskSummaryPanel,
        divider(),
        riskPanel,
        projectPanel,
      ])
    } else {
      displayPanel = panel([
        riskSummaryPanel,
        divider(),
        riskPanel,
        divider(),
        simulationPanel,
        projectPanel,
      ])
    }

    return {
      content: displayPanel,
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
      heading(`Risk Summary Check`),
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
      text(`**- Risky factors -**`),
      text(`⛔️**Oops, service have something problems...**!😬`),
      text(`${JSON.stringify(error)}`),
    ])
  }

  return panel([
    text(`**- Risky factors -**`),
    ...result.factors.map((insight) =>
      panel([
        text(`${SnapContentMapping.transaction_risk_type[insight.type]} ${ApiMapping.api.transaction_risks[insight.name]}`),
        text(`${insight.message}`),
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
    panel([
      text(`**You're about to buy a NFT via a smart contract.**`),
    ]),
    divider(),
    panel([
      heading(`Payment Detail`),
      text(`Pay ➞`),
      text(`-0.00099 ETH ($1.81)`),
      text(`➞ Get`),
      text(`Ethernal Butterfly_Ovum Miraculi ($3.50)`),
      text(`**---**`),
      text(`**Via Seaport and other 4 contracts ✅**`),
      text(`1.[Seaport] Contract address 👉[ 0xed1Bd4A5244D35Be12e84A3E9821290032a47a99] 🌐[Contract: Open✅]`),
      text(`2.[PayableProxy] Contract address 👉[ 0x0000a26b00c1f0df003000390027140000faa719] 🌐[Contract: Open✅] ▶ -0.00002475 ETH ($0.0449)️ *Platform fee exchange, opensea`),
      text(`3.[Conduit] Contract address 👉[ 0x1e0049783f008a0085193e00003d00cd54003c71] 🌐[Contract: Open✅]`),
      text(`4.[ERC1155CreatorImplementation] Contract address 👉[ 0xe9ff7ca11280553af56d04ecb8be6b8c4468dcb2] 🌐[Contract: Open✅]`),
      text(`5.[EB] Contract address 👉[ 0xed1bd4a5244d35be12e84a3e9821290032a47a99] 🌐[Contract: Open✅] ▶ -0.00096525 ETH ($1.77)️ *Price of the NFT 🏷️ New`),
    ]),
    panel([
      heading('Balance Changes'),
      divider(),
      text(`Before ➞`),
      text('8,166,276,251,901,340 Wei ($ 14.8089)'), // ${JSON.stringify( result.simulationResult.fromAddressBalanceOriginal)}
      text(`➞ After`),
      text('7,176,276,251,901,340 Wei ($ 13.0136)'),
      text(`**---**`),
      text(`**💰Balance Diff.**`),
      text(`990,000,000,000,000 wei ($1.81)`),  // ${JSON.stringify( result.simulationResult.fromAddressBalanceDiff)}
    ]),
  ])
}

function convertToProjectPanel() {
  return panel([
    heading(`Project Insight`),
    divider(),
    text(`**Ethernal Butterfly**`),
    text(`Contract address 👉🏻 [0xed1bd4a5244d35be12e84a3e9821290032a47a99]`),
    text(`URL 🌐 [https://www.example.com]`),
    text(`Twitter 👉🏻 [https://www.twitter.com/const_quary]`),
    text(`Discord 👉🏻 [https://discord.gg/quary]`),
    text(`OpenSea 👉🏻 [https://opensea.io/collection/ethernal-butterfly]`),
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
