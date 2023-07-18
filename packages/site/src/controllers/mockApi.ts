import pgw from 'controllers/pgw'
import { proxyConvertToPayload } from 'helpers/proxyRestructure'
import { TProxyObj } from 'helpers/types/proxyRestructure.type'
import Logger from 'controllers/logger'
import { IResponseError } from 'controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from 'helpers/parser/pgw/types/postTransactionRisks.type'

const logger = new Logger('[snap]')

export const sendTransactionRisk = async (): Promise<
  [IPostTransactionRisksResponseParsed, IResponseError]
> => {
  const mockTxn = {
    method: 'eth_sendTransaction',
    url: 'https://stg.d2xaw2fxxh4153.amplifyapp.com',
    params: [
      {
        gas: '0x9f00',
        from: '0xf63aada4bdd91a0bef667659321a83d94fc87bbe',
        to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        data: '0xa9059cbb00000000000000000000000047f02f7f5896f5d5ab019fe298fad71003f2574a0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
  }
  let result: IPostTransactionRisksResponseParsed = {} as IPostTransactionRisksResponseParsed
  let error: IResponseError = {} as IResponseError
  try {
    result = await pgw.postTransactionRisks(
      proxyConvertToPayload(mockTxn.url, mockTxn as TProxyObj),
    )
  } catch (e) {
    error = e
    logger.error(`${JSON.stringify(error)}`)
  }

  return [result, error]
}

export default {
  sendTransactionRisk,
}
