import { Json, OnTransactionResponse } from '@metamask/snaps-types'
import { TSnapState } from './snapState.type'

export type TTransactionInsightLayout = (
    args: {
        transaction: {
            [key: string]: Json
        }
        chainId: string
        transactionOrigin?: string
    },
    state: TSnapState
) => Promise<OnTransactionResponse>
