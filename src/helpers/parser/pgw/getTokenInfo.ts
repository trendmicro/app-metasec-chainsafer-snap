import type { TGetTokenInfo } from '../../../helpers/parser/pgw/types/getTokenInfo.type'

import { parserMapping } from '../../../helpers/parser/parser'
import { resProjectInsightWebsite, resProjectInsightBlog, resProjectInsightTwitter, resProjectInsightDiscord } from '../../../constants/content'

const getTokenInfo: TGetTokenInfo = (responseBody) => {
    let tokenInfo = {}
    if (
        responseBody.hasOwnProperty('website') &&
        responseBody.website !== null &&
        responseBody.website !== ''
    ) {
        tokenInfo = {
            ...tokenInfo,
            Website: resProjectInsightWebsite(parserMapping<string>(responseBody, 'website', '')),
        }
    }
    if (
        responseBody.hasOwnProperty('blog') &&
        responseBody.blog !== null &&
        responseBody.blog !== ''
    ) {
        tokenInfo = {
            ...tokenInfo,
            Blog: resProjectInsightBlog(
                parserMapping<string>(responseBody, 'blog', '')
            ),
        }
    }
    if (
        responseBody.hasOwnProperty('twitter') &&
        responseBody.twitter !== null &&
        responseBody.twitter !== ''
    ) {
        tokenInfo = {
            ...tokenInfo,
            Twitter: resProjectInsightTwitter(parserMapping<string>(responseBody, 'twitter', '')),
        }
    }
    if (
        responseBody.hasOwnProperty('discord') &&
        responseBody.discord !== null &&
        responseBody.discord !== ''
    ) {
        tokenInfo = {
            ...tokenInfo,
            Discord: resProjectInsightDiscord(parserMapping<string>(responseBody, 'discord', '')),
        }
    }
    // if (
    //     responseBody.hasOwnProperty('bitcointalk') &&
    //     responseBody.bitcointalk !== null &&
    //     responseBody.bitcointalk !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Bitcointalk: parserMapping<string>(responseBody, 'bitcointalk', ''),
    //     }
    // }
    // if (responseBody.hasOwnProperty('blue_checkmark') && responseBody.blue_checkmark !== null) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         BlueCheckMark: parserMapping<boolean>(responseBody, 'blue_checkmark', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('contract_address') &&
    //     responseBody.contract_address !== null &&
    //     responseBody.contract_address !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         ContractAddress: parserMapping<string>(responseBody, 'contract_address', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('description') &&
    //     responseBody.description !== null &&
    //     responseBody.description !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Description: parserMapping<string>(responseBody, 'description', ''),
    //     }
    // }
    // if (responseBody.hasOwnProperty('divisor') && responseBody.divisor !== null) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Divisor: parserMapping<number>(responseBody, 'divisor', 0),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('email') &&
    //     responseBody.email !== null &&
    //     responseBody.email !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Email: parserMapping<string>(responseBody, 'email', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('facebook') &&
    //     responseBody.facebook !== null &&
    //     responseBody.facebook !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Facebook: parserMapping<string>(responseBody, 'facebook', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('github') &&
    //     responseBody.github !== null &&
    //     responseBody.github !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Github: parserMapping<string>(responseBody, 'github', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('linkedin') &&
    //     responseBody.linkedin !== null &&
    //     responseBody.linkedin !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Linkedin: parserMapping<string>(responseBody, 'linkedin', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('reddit') &&
    //     responseBody.reddit !== null &&
    //     responseBody.reddit !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Reddit: parserMapping<string>(responseBody, 'reddit', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('slack') &&
    //     responseBody.slack !== null &&
    //     responseBody.slack !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Slack: parserMapping<string>(responseBody, 'slack', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('symbol') &&
    //     responseBody.symbol !== null &&
    //     responseBody.symbol !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Symbol: parserMapping<string>(responseBody, 'symbol', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('telegram') &&
    //     responseBody.telegram !== null &&
    //     responseBody.telegram !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Telegram: parserMapping<string>(responseBody, 'telegram', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('token_name') &&
    //     responseBody.token_name !== null &&
    //     responseBody.token_name !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         TokenName: parserMapping<string>(responseBody, 'token_name', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('tokenPriceUSD') &&
    //     responseBody.tokenPriceUSD !== null &&
    //     responseBody.tokenPriceUSD !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         TokenPriceUSD: parserMapping<string>(responseBody, 'tokenPriceUSD', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('total_supply') &&
    //     responseBody.total_supply !== null &&
    //     responseBody.total_supply !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         TotalSupply: parserMapping<string>(responseBody, 'total_supply', ''),
    //     }
    // }
    
    // if (
    //     responseBody.hasOwnProperty('wechat') &&
    //     responseBody.wechat !== null &&
    //     responseBody.wechat !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Wechat: parserMapping<string>(responseBody, 'wechat', ''),
    //     }
    // }
    // if (
    //     responseBody.hasOwnProperty('whitepaper') &&
    //     responseBody.whitepaper !== null &&
    //     responseBody.whitepaper !== ''
    // ) {
    //     tokenInfo = {
    //         ...tokenInfo,
    //         Whitepaper: parserMapping<string>(responseBody, 'whitepaper', ''),
    //     }
    // }

    return tokenInfo
}

export default getTokenInfo
