import type { TGetTokenInfo } from '../../../helpers/parser/pgw/types/getTokenInfo.type'

import { parserMapping } from '../../../helpers/parser/parser'

const getTokenInfo: TGetTokenInfo = (responseBody) => {
    let tokenInfo = {}
    if (responseBody.hasOwnProperty('bitcointalk')) { 
        tokenInfo = {
            ...tokenInfo,
            bitcointalk: parserMapping<string>(responseBody, 'bitcointalk', ''),
        }
    }
    if (responseBody.hasOwnProperty('blog')) { 
        tokenInfo = {
            ...tokenInfo,
            blog: parserMapping<string>(responseBody, 'blog', ''),
        }
    }
    if (responseBody.hasOwnProperty('blue_checkmark')) { 
        tokenInfo = {
            ...tokenInfo,
            blueCheckMark: parserMapping<string>(responseBody, 'blue_checkmark', ''),
        }
    }
    if (responseBody.hasOwnProperty('contract_address')) {
        tokenInfo = {
            ...tokenInfo,
            contractAddress: parserMapping<string>(responseBody, 'contract_address', ''),
        }
    }
    if (responseBody.hasOwnProperty('description')) {
        tokenInfo = {
            ...tokenInfo,
            description: parserMapping<string>(responseBody, 'description', ''),
        }
    }
    if (responseBody.hasOwnProperty('discord')) {
        tokenInfo = {
            ...tokenInfo,
            discord: parserMapping<string>(responseBody, 'discord', ''),
        }
    }
    if (responseBody.hasOwnProperty('divisor')) {
        tokenInfo = {
            ...tokenInfo,
            divisor: parserMapping<number>(responseBody, 'divisor', 0),
        }
    }
    if (responseBody.hasOwnProperty('email')) {
        tokenInfo = {
            ...tokenInfo,
            email: parserMapping<string>(responseBody, 'email', ''),
        }
    }
    if (responseBody.hasOwnProperty('facebook')) {
        tokenInfo = {
            ...tokenInfo,
            facebook: parserMapping<string>(responseBody, 'facebook', ''),
        }
    }
    if (responseBody.hasOwnProperty('github')) {
        tokenInfo = {
            ...tokenInfo,
            github: parserMapping<string>(responseBody, 'github', ''),
        }
    }
    if (responseBody.hasOwnProperty('linkedin')) {
        tokenInfo = {
            ...tokenInfo,
            linkedin: parserMapping<string>(responseBody, 'linkedin', ''),
        }
    }
    if (responseBody.hasOwnProperty('reddit')) {
        tokenInfo = {
            ...tokenInfo,
            reddit: parserMapping<string>(responseBody, 'reddit', ''),
        }
    }
    if (responseBody.hasOwnProperty('slack')) {
        tokenInfo = {
            ...tokenInfo,
            slack: parserMapping<string>(responseBody, 'slack', ''),
        }
    }
    if (responseBody.hasOwnProperty('symbol')) {
        tokenInfo = {
            ...tokenInfo,
            symbol: parserMapping<string>(responseBody, 'symbol', ''),
        }
    }
    if (responseBody.hasOwnProperty('telegram')) {
        tokenInfo = {
            ...tokenInfo,
            telegram: parserMapping<string>(responseBody, 'telegram', ''),
        }
    }
    if (responseBody.hasOwnProperty('token_name')) {
        tokenInfo = {
            ...tokenInfo,
            tokenName: parserMapping<string>(responseBody, 'token_name', ''),
        }
    }
    if (responseBody.hasOwnProperty('tokenPriceUSD')) {
        tokenInfo = {
            ...tokenInfo,
            tokenPriceUSD: parserMapping<string>(responseBody, 'tokenPriceUSD', ''),
        }
    }
    if (responseBody.hasOwnProperty('total_supply')) {
        tokenInfo = {
            ...tokenInfo,
            totalSupply: parserMapping<string>(responseBody, 'total_supply', ''),
        }
    }
    if (responseBody.hasOwnProperty('twitter')) {
        tokenInfo = {
            ...tokenInfo,
            twitter: parserMapping<string>(responseBody, 'twitter', ''),
        }
    }
    if (responseBody.hasOwnProperty('website')) {
        tokenInfo = {
            ...tokenInfo,
            website: parserMapping<string>(responseBody, 'website', ''),
        }
    }
    if (responseBody.hasOwnProperty('wechat')) {
        tokenInfo = {
            ...tokenInfo,
            wechat: parserMapping<string>(responseBody, 'wechat', ''),
        }
    }
    if (responseBody.hasOwnProperty('whitepaper')) {
        tokenInfo = {
            ...tokenInfo,
            whitepaper: parserMapping<string>(responseBody, 'whitepaper', ''),
        }
    }
    
    return tokenInfo
}

export default getTokenInfo
