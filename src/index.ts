import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types'
import { panel, copyable, divider, heading, text } from '@metamask/snaps-ui'
import { API, ENABLE_CLIENT_CONSOLE } from './constants/config'
import Logger from './controllers/logger'
import { transactionInsightLayout } from './helpers/snapContent'

const logger = new Logger('[index]')
export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  chainId,
  transaction,
}) => {
  logger.log('transactionOrigin:', transactionOrigin)
  logger.log('chainId:', chainId)
  logger.log('transaction:', transaction)

  return transactionInsightLayout({ transactionOrigin, chainId, transaction })
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
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text(`Hello, **${origin}**!😑🫨😬`),
            divider(),
            heading('Envirment Variables'),
            text(`${ENABLE_CLIENT_CONSOLE ? 'dev' : 'prod'} `),
            text(`API PGW BASE: ${API.PGW.base}`),
            divider(),
            heading('Params From Dapp'),
            copyable(`${origin}`),
            text(`${JSON.stringify(request.params)}`),
          ]),
        },
      })
    default:
      throw new Error('Method not found.')
  }
}
