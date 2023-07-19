export interface IGetAddressInfoResponseBody {
  address: string
  bitcointalk: string
  block_number: number
  blog: string
  blue_checkmark: boolean
  collection_desc: string
  collection_id: string
  collection_name: string
  create_time: string
  discord: string
  divisor: number
  email: string
  erc_type: string
  facebook: string
  github: string
  is_contract: boolean
  linkedin: string
  reddit: string
  slack: string
  supply: string
  symbol: string
  telegram: string
  token_create_time: string
  token_desc: string
  token_name: string
  twitter: string
  update_time: string
  website: string
  wechat: string
  whitepaper: string
}

export interface IGetAddressInfoResponseParsed {
  blockNumber: number
  social: {
    email: string
    blog: string
    bitcointalk: string
    twitter: string
    telegram: string
    discord: string
    facebook: string
    github: string
    linkedin: string
    reddit: string
    slack: string
    wechat: string
  },
  crypto: {
    address: string
    ercType: string
    blueCheck: boolean
    //only nft
    collection: {
      id: string
      name: string
    },
    tokenName: string
    divisor: number
    isContract: boolean
    supply: string
    symbol: string
    createTime: Date
    website: string
    whitepaper: string
  },
  createTime: Date
  updateTime: Date
}

export type TGetAddressInfo = (responseBody: IGetAddressInfoResponseBody) => IGetAddressInfoResponseParsed