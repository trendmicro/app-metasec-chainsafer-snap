import { OnRpcRequestHandler } from '@metamask/snaps-types'
import { divider, panel, text } from '@metamask/snaps-ui'
import { API_KEY, ENV } from './config'

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
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text(`Hello, **${ origin }**!`),
            divider(),
            text('**Envirment Variable:**'),
            text(`ENV: ${ ENV }`),
            text(`API_KEY: ${ API_KEY }`),
            divider(),
            text(`Params from: **${ origin }**`),
            text(`${JSON.stringify(request.params)}`)
          ]),
        },
      })
    case 'login':
    case 'reNewToken':
    default:
      throw new Error('Method not found.')
  }
}