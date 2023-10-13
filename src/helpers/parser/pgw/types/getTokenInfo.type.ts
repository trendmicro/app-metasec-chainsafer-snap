export interface IGetTokenInfoResponseBody {
    bitcointalk?: string
    blog?: string
    blue_checkmark?: boolean
    contract_address?: string
    description?: string
    discord?: string
    divisor?: number
    email?: string
    facebook?: string
    github?: string
    linkedin?: string
    reddit?: string
    slack?: string
    symbol?: string
    telegram?: string
    token_name?: string
    tokenPriceUSD?: string
    total_supply?: string
    twitter?: string
    website?: string
    wechat?: string
    whitepaper?: string
}

export interface IGetTokenInfoResponseParsed {
    bitcointalk?: string
    blog?: string
    blueCheckMark?: boolean
    contractAddress?: string
    description?: string
    discord?: string
    divisor?: number
    email?: string
    facebook?: string
    github?: string
    linkedin?: string
    reddit?: string
    slack?: string
    symbol?: string
    telegram?: string
    tokenName?: string
    tokenPriceUSD?: string
    totalSupply?: string
    twitter?: string
    website?: string
    wechat?: string
    whitepaper?: string
}

export type TGetTokenInfo = (responseBody: IGetTokenInfoResponseBody) => IGetTokenInfoResponseParsed
