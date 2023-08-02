import type {
  TGetAddressInfo
} from '../../../helpers/parser/pgw/types/getAddressInfo.type'

import { parserMapping } from '../../../helpers/parser/parser'

const getAddressInfo: TGetAddressInfo = (responseBody) => {
  return {
    blockNumber: parserMapping<number>(responseBody, 'block_number', 0),
    social: {
      email: parserMapping<string>(responseBody, 'email', ''),
      blog: parserMapping<string>(responseBody, 'blog', ''),
      bitcointalk: parserMapping<string>(responseBody, 'bitcointalk', ''),
      twitter: parserMapping<string>(responseBody, 'twitter', ''),
      telegram: parserMapping<string>(responseBody, 'telegram', ''),
      discord: parserMapping<string>(responseBody, 'discord', ''),
      facebook: parserMapping<string>(responseBody, 'facebook', ''),
      github: parserMapping<string>(responseBody, 'github', ''),
      linkedin: parserMapping<string>(responseBody, 'linkedin', ''),
      reddit: parserMapping<string>(responseBody, 'reddit', ''),
      slack: parserMapping<string>(responseBody, 'slack', ''),
      wechat: parserMapping<string>(responseBody, 'wechat', ''),
    },
    crypto: {
      address: parserMapping<string>(responseBody, 'address', ''),
      ercType: parserMapping<string>(responseBody, 'erc_type', ''),
      blueCheck: parserMapping<boolean>(responseBody, 'blue_checkmark', false),
      //only nft
      collection: {
        id: parserMapping<string>(responseBody, 'collection_id', ''),
        name: parserMapping<string>(responseBody, 'collection_name', ''),
      },
      tokenName: parserMapping<string>(responseBody, 'token_name', ''),
      divisor: parserMapping<number>(responseBody, 'divisor', 0),
      isContract: parserMapping<boolean>(responseBody, 'is_contract', false),
      supply: parserMapping<string>(responseBody, 'supply', ''),
      symbol: parserMapping<string>(responseBody, 'symbol', ''),
      createTime: parserMapping<Date>(responseBody, 'token_create_time', 0),
      website: parserMapping<string>(responseBody, 'website', ''),
      whitepaper: parserMapping<string>(responseBody, 'whitepaper', ''),
    },
    createTime: parserMapping<Date>(responseBody, 'create_time', 0),
    updateTime: parserMapping<Date>(responseBody, 'update_time', 0)
  }
}

export default getAddressInfo