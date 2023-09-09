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

const {formatEther} = require("@ethersproject/units");

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
    const [simulationResult, simulationError] = await postTransactionSimulation(chainId, transaction)

    let riskPanel = convertToRiskPanel(riskResult, riskError)
    let riskSummaryPanel = convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError)
    let simulationPanel = convertToSimulationPanel(simulationResult, simulationError)
    // let projectPanel = convertToProjectPanel()

    let displayPanel = panel([])
    if (riskSummaryResult.severity == "caution") {
      displayPanel = panel([
        simulationPanel,
        divider(),
        riskSummaryPanel,
        divider(),
        riskPanel,
        // projectPanel,
      ])
    } else {
      displayPanel = panel([
        riskSummaryPanel,
        divider(),
        riskPanel,
        divider(),
        simulationPanel,
        // projectPanel,
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
  }

  if (result == null) {
    return panel([])
  }

  return panel([
    heading(`${SnapContentMapping.transaction_risk_summary[result.severity]} ${ApiMapping.pages.transaction_risk[result.severity]}`),
    text(`**${ApiMapping.api.transaction_risks_summary[result.ruleName]}**`),
  ])
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

  if (result == null) {
    return panel([])
  }

  return panel([
    text(`**- Risky factors -**`),
    ...result.factors.map((insight) =>
      panel([
        text(`${SnapContentMapping.transaction_risk_type[insight.type]} ${ApiMapping.api.transaction_risks[insight.name]}`),
        ...insight.message.split("\n").map((message) =>
          text(`${message}`)
        )
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

  if (result == null) {
    return panel([])
  }

  if (result.evmErrAddress != "" || result.evmErrMessage != "") {
    return panel([
      heading('Transaction Simulation'),
      divider(),
      text(`⛔️**Oops, service have something problems...**!😑`),
      text(`address: ${result.evmErrAddress}`),
      text(`error: ${result.evmErrMessage}`),
    ])
  }

  if (result.senderAssetChange == null && result.contracts == null) {
    return panel([])
  }

  console.log("convertToSimulationPanel result:", result)

  let paymentDetailPanel = []
  let tokenChangePanel = []
  let contractPanel = []
  let balanceChangePanel = []

  if (result.senderAssetChange != null && result.senderAssetChange.balanceDiff != null) {
    const originWei = parseInt(result.senderAssetChange.balanceDiff.origin)
    const originUSD = parseInt(result.senderAssetChange.balanceDiff.originDollarValue)
    const afterWei = parseInt(result.senderAssetChange.balanceDiff.after)
    const afterUSD = parseInt(result.senderAssetChange.balanceDiff.afterDollarValue)
    const diffWei = afterWei - originWei
    const diffUSD = afterUSD - originUSD

    paymentDetailPanel = [
      text(`Pay ➞`),
      text(`${convertWeiToEth(diffWei.toString())} Eth${Number.isNaN(diffUSD) ? `` : ` ($ ${diffUSD})`}`),
    ]
    balanceChangePanel = [
      heading('Balance Changes'),
      divider(),
      text(`Before ➞`),
      text(`${convertWeiToEth(originWei.toString())} Eth ${Number.isNaN(originUSD) ? `` : ` ($ ${originUSD})`}`),
      text(`➞ After`),
      text(`${convertWeiToEth(afterWei.toString())} Eth ${Number.isNaN(afterUSD) ? `` : ` ($ ${afterUSD})`}`),
      text(`**---**`),
      text(`**💰Balance Diff.**`),
      text(`${convertWeiToEth(diffWei.toString())} Eth${Number.isNaN(diffUSD) ? `` : ` ($ ${diffUSD})`}`),
    ]
  }

  // payment detail panel
  if (result.senderAssetChange != null && result.senderAssetChange.tokenChanges != null && result.senderAssetChange.tokenChanges.length > 0) {
    result.senderAssetChange.tokenChanges.forEach(function (tokenChange) {
      tokenChangePanel.push(
        text(`➞ ${tokenChange.direction == 'in' ? "Get" : "Sell"}`),
        text(`${tokenChange.name} ($${tokenChange.dollarValue})`)
      )
    })
    tokenChangePanel.push(
      text(`**---**`),
    )
  }

  // contract panel
  if (result.contracts != null && result.contracts.length > 0) {
    contractPanel.push(
      text(`**Via ${result.contracts[0].contractName} and other ${result.contracts.length - 1} contracts ✅**`),
    )
    result.contracts.forEach(function (contract, index) {
      contractPanel.push(
        text(`${index + 1}.[${contract.contractName}] Contract address 👉[${contract.address}] 🌐[Contract: ${contract.isPublic == true ? "Open✅" : "Private❗️"}] ${parseFloat(contract.fee) > 0 ? `▶ ${convertWeiToEth(contract.fee).toString()} ETH` : ""} ${Number.isNaN(parseInt(contract.feeDollarValue)) ? "" : `($${contract.feeDollarValue})`}
        `),
      )
    })
  }

  return panel([
    text(`**You're about to buy a NFT via a smart contract.**`),
    divider(),
    ...paymentDetailPanel,
    ...tokenChangePanel,
    ...contractPanel,
    ...balanceChangePanel,
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

function convertWeiToEth(wei: string): string {
  if (Number.isNaN(parseInt(wei))) {
    return "0"
  }
  let eth = formatEther(wei)

  return eth
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
