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
    Bitcointalk?: string
    Blog?: string
    BlueCheckMark?: boolean
    ContractAddress?: string
    Description?: string
    Discord?: string
    Divisor?: number
    Email?: string
    Facebook?: string
    Github?: string
    Linkedin?: string
    Reddit?: string
    Slack?: string
    Symbol?: string
    Telegram?: string
    TokenName?: string
    TokenPriceUSD?: string
    TotalSupply?: string
    Twitter?: string
    Website?: string
    Wechat?: string
    Whitepaper?: string
}

export type TGetTokenInfo = (responseBody: IGetTokenInfoResponseBody) => IGetTokenInfoResponseParsed
