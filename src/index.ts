import { OnTransactionHandler } from '@metamask/snaps-types'
import { transactionInsightLayout } from './helpers/snapContent'
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

  return transactionInsightLayout({ transactionOrigin, chainId, transaction })
}