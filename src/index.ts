import { OnTransactionHandler, OnRpcRequestHandler } from '@metamask/snaps-types'
import { transactionInsightLayout } from './helpers/snapContent'
import { TSnapState } from './helpers/types/snapState.type'
import { getSnapState, setSnapState } from './helpers/snapState'

import Logger from './controllers/logger'
const logger = new Logger('[index]')

export const onTransaction: OnTransactionHandler = async ({
    transactionOrigin,
    chainId,
    transaction,
}) => {
    logger.log('transactionOrigin:', transactionOrigin)
    logger.log('chainId:', chainId)
    logger.log('transaction:', transaction)
    logger.log('snap state:', getSnapState())

    return transactionInsightLayout({ transactionOrigin, chainId, transaction })
}

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
    switch (request.method) {
        case 'storeState':
            if (request.params) {
                const state: TSnapState = (request.params as TSnapState) ?? undefined
                if (state) {
                    await setSnapState(state)
                }
            }
            return true
        default:
            throw new Error('Method not found.')
    }
}
