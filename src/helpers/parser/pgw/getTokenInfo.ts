import type { TGetTokenInfo } from '../../../helpers/parser/pgw/types/getTokenInfo.type'

import { parserMapping } from '../../../helpers/parser/parser'

const getTokenInfo: TGetTokenInfo = (responseBody) => {
    let tokenInfo = {}
    if (responseBody.hasOwnProperty('bitcointalk') && responseBody.bitcointalk !== null && responseBody.bitcointalk !== '') { 
        tokenInfo = {
            ...tokenInfo,
            bitcointalk: parserMapping<string>(responseBody, 'bitcointalk', ''),
        }
    }
    if (responseBody.hasOwnProperty('blog') && responseBody.blog !== null && responseBody.blog !== '') { 
        tokenInfo = {
            ...tokenInfo,
            blog: parserMapping<string>(responseBody, 'blog', ''),
        }
    }
    if (responseBody.hasOwnProperty('blue_checkmark') && responseBody.blue_checkmark !== null ) { 
        tokenInfo = {
            ...tokenInfo,
            blueCheckMark: parserMapping<string>(responseBody, 'blue_checkmark', ''),
        }
    }
    if (responseBody.hasOwnProperty('contract_address') && responseBody.contract_address !== null && responseBody.contract_address !== '') {
        tokenInfo = {
            ...tokenInfo,
            contractAddress: parserMapping<string>(responseBody, 'contract_address', ''),
        }
    }
    if (responseBody.hasOwnProperty('description') && responseBody.description !== null && responseBody.description !== '') {
        tokenInfo = {
            ...tokenInfo,
            description: parserMapping<string>(responseBody, 'description', ''),
        }
    }
    if (responseBody.hasOwnProperty('discord') && responseBody.discord !== null && responseBody.discord !== '') {
        tokenInfo = {
            ...tokenInfo,
            discord: parserMapping<string>(responseBody, 'discord', ''),
        }
    }
    if (responseBody.hasOwnProperty('divisor') && responseBody.divisor !== null ) {
        tokenInfo = {
            ...tokenInfo,
            divisor: parserMapping<number>(responseBody, 'divisor', 0),
        }
    }
    if (responseBody.hasOwnProperty('email') && responseBody.email !== null && responseBody.email !== '') {
        tokenInfo = {
            ...tokenInfo,
            email: parserMapping<string>(responseBody, 'email', ''),
        }
    }
    if (responseBody.hasOwnProperty('facebook') && responseBody.facebook !== null && responseBody.facebook !== '') {
        tokenInfo = {
            ...tokenInfo,
            facebook: parserMapping<string>(responseBody, 'facebook', ''),
        }
    }
    if (responseBody.hasOwnProperty('github') && responseBody.github !== null && responseBody.github !== '') {
        tokenInfo = {
            ...tokenInfo,
            github: parserMapping<string>(responseBody, 'github', ''),
        }
    }
    if (responseBody.hasOwnProperty('linkedin') && responseBody.linkedin !== null && responseBody.linkedin !== '') {
        tokenInfo = {
            ...tokenInfo,
            linkedin: parserMapping<string>(responseBody, 'linkedin', ''),
        }
    }
    if (responseBody.hasOwnProperty('reddit') && responseBody.reddit !== null && responseBody.reddit !== '') {
        tokenInfo = {
            ...tokenInfo,
            reddit: parserMapping<string>(responseBody, 'reddit', ''),
        }
    }
    if (responseBody.hasOwnProperty('slack') && responseBody.slack !== null && responseBody.slack !== '') {
        tokenInfo = {
            ...tokenInfo,
            slack: parserMapping<string>(responseBody, 'slack', ''),
        }
    }
    if (responseBody.hasOwnProperty('symbol') && responseBody.symbol !== null && responseBody.symbol !== '') {
        tokenInfo = {
            ...tokenInfo,
            symbol: parserMapping<string>(responseBody, 'symbol', ''),
        }
    }
    if (responseBody.hasOwnProperty('telegram') && responseBody.telegram !== null && responseBody.telegram !== '') {
        tokenInfo = {
            ...tokenInfo,
            telegram: parserMapping<string>(responseBody, 'telegram', ''),
        }
    }
    if (responseBody.hasOwnProperty('token_name') && responseBody.token_name !== null && responseBody.token_name !== '') {
        tokenInfo = {
            ...tokenInfo,
            tokenName: parserMapping<string>(responseBody, 'token_name', ''),
        }
    }
    if (responseBody.hasOwnProperty('tokenPriceUSD') && responseBody.tokenPriceUSD !== null && responseBody.tokenPriceUSD !== '') {
        tokenInfo = {
            ...tokenInfo,
            tokenPriceUSD: parserMapping<string>(responseBody, 'tokenPriceUSD', ''),
        }
    }
    if (responseBody.hasOwnProperty('total_supply') && responseBody.total_supply !== null && responseBody.total_supply !== '') {
        tokenInfo = {
            ...tokenInfo,
            totalSupply: parserMapping<string>(responseBody, 'total_supply', ''),
        }
    }
    if (responseBody.hasOwnProperty('twitter') && responseBody.twitter !== null && responseBody.twitter !== '') {
        tokenInfo = {
            ...tokenInfo,
            twitter: parserMapping<string>(responseBody, 'twitter', ''),
        }
    }
    if (responseBody.hasOwnProperty('website') && responseBody.website !== null && responseBody.website !== '') {
        tokenInfo = {
            ...tokenInfo,
            website: parserMapping<string>(responseBody, 'website', ''),
        }
    }
    if (responseBody.hasOwnProperty('wechat') && responseBody.wechat !== null && responseBody.wechat !== '') {
        tokenInfo = {
            ...tokenInfo,
            wechat: parserMapping<string>(responseBody, 'wechat', ''),
        }
    }
    if (responseBody.hasOwnProperty('whitepaper') && responseBody.whitepaper !== null && responseBody.whitepaper !== '') {
        tokenInfo = {
            ...tokenInfo,
            whitepaper: parserMapping<string>(responseBody, 'whitepaper', ''),
        }
    }
    
    return tokenInfo
}

export default getTokenInfo
