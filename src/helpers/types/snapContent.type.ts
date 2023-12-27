import { Json, OnTransactionResponse } from '@metamask/snaps-sdk'
import { TSnapState } from './snapState.type'

export type TTransactionInsightLayout = (args: {
    transaction: {
        [key: string]: Json
    }
    chainId: string
    transactionOrigin?: string
}) => Promise<OnTransactionResponse>
