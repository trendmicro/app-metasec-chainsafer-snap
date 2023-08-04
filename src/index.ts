import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-types'
import { Panel, copyable, divider, heading, panel, spinner, text } from '@metamask/snaps-ui'
import { ENV, API } from './constants/config'
import Logger from './controllers/logger'
import { sendTransactionRisk } from './controllers/mockApi'
import { postTransactionRisk, postTransactionSimulation } from './chainsafer'
import { IPostTransactionRisksResponseParsed } from './helpers/parser/pgw/types/postTransactionRisks.type'
import { IPostTransactionSimulationResponseParsed } from './helpers/parser/pgw/types/postTransactionSimulation.type'
const logger = new Logger('[src.index]')


export const onTransaction: OnTransactionHandler = async ({ transactionOrigin, chainId ,transaction }) => {
  console.log("transactionOrigin:", transactionOrigin)
  console.log("chainId:", chainId)
  console.log("transaction:", transaction)

  let riskPanel = await postTransactionRisk(transactionOrigin, transaction)
  let simulationPanel = await postTransactionSimulation(transactionOrigin, transaction)

  return { content: 
    panel([
      riskPanel,
      simulationPanel,
    ]
    )
  };
};

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
            text(`Hello, **${ origin }**!😑🫨😬`),
            divider(),
            heading('Envirment Variables'),
            text(`ENV: ${ ENV }`),
            text(`API PGW BASE: ${ API.PGW.base }`),
            divider(),
            heading('Params From Dapp'),
            copyable(
              `${origin}`,    
            ),
            text(`${ JSON.stringify(request.params) }`),
            divider(),
            heading('Response From PGW'),
            text(`Result: ${ JSON.stringify(result) }`),
            text(`Error: ${ JSON.stringify(error) }`),
          ]),
        },
      })
    case 'login':
    case 'reNewToken':
    default:
      throw new Error('Method not found.')
  }
}
