import { OnRpcRequestHandler } from '@metamask/snaps-types'
import { panel, text } from '@metamask/snaps-ui'
import { ENV, API_KEY } from './config'

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
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  console.log(`!!!!! node_env ${process.env.NODE_ENV} var ${process.env.API_KEY}!!!!!!`)
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('Response:'),
            text(`${ENV}`),
            text(`${API_KEY}`),
            text(`${JSON.stringify(request.params)}`),
          ]),
        },
      })
    case 'login':
    case 'reNewToken':
    default:
      throw new Error('Method not found.')
  }
}
