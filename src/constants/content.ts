import { DAPP_LINK } from "./config"

export const riskIconMapping = {
    transaction_risks_summary: {
        fatal_risk: '❌',
        high_risk: '🔶',
        caution: '🟨',
    },
    transaction_risk_type: {
        severe_risk: '🔴',
        minor_risk: '🟠',
        attention_required: '🟡',
    },
}
export const updateAlert = {
    forceUpdate:
        `[❕ ALERT] Current version is not available anymore! Please visit 🌐“${DAPP_LINK}” to update.`,
    snapUpdate:
        `[❕ ALERT] There is an update of ChainSafer Snap, for better protection, please visit 🌐“${DAPP_LINK}” to update.`,
}

export function collectionSummary(collectionTokenName: string, reputation: string) {
    return `Collection:${collectionTokenName} (Reputation ${reputation} )`
}
export const serviceError = {
    serviceError: 'Trend Micro ChainSafer is not available now, please try again later.',
    simulationError: '[Simulation] Service not available now.',
    riskApiError: '🚧 [Risk detection] No service',
    riskApiErrorDetail: 'Risk detection service not available now, please try again later.',
    unsupportedChainId: '[Simulation] Only Support Ethereum Mainnet currently.',
}

export function countRecipient(recipientNumber: number) {
    return `This transaction goes thru ${recipientNumber} contracts/ recipients`
}

export function recipientLableInfo(name: string, source: string) {
    return `🚨Label:  ${name}_${source}`
}

export function recipientListWarningContractTitle(contract: number) {
    return `, ${contract} of them might exist security concern:`
}

export function evmErrorAddress(evmErrorAddress: string) {
    return `address: ${evmErrorAddress}`
}

export function evmErrMessage(evmErrMessage: string) {
    return `error: ${evmErrMessage}`
}

export function transactionMethodIs(method: string) {
    return `Transaction Method: ${method}`
}

export const chainSaferAd = {
    adTitle: '[ 📣 NEWS] Want a comprehensive protection? 🛡️ ',
    adContent: 'Check the SecuX x Trend Micro ChainSafer special hardware wallet 💪🏼',
}

export const headingText = {
    latestVersion: 'Latest Version',
    riskSummary: 'Risk Summary Check',
    riskFactor: '**- Risky factors -**',
    transactionSimulation: 'Transaction Simulation',
    pay: 'Pay ➞',
    balanceChanges: 'Balance Changes',
    paymentDetailPanel: 'Payment Detail',
    projectInsightPanel: 'Project Insight',
    recipientsPanel: 'Recipients',
}

export function tokenNameWithBlueMark(tokenName: string) {
    return `${tokenName} (Reputation 🆗)`
}

export function tokenNameWithoutBlueMark(tokenName: string) {
    return `${tokenName} (Reputation ❔️)`
}

export function tokenSymbolAndValue(
    tokenType: string,
    tokenSymbol: string,
    rawAmount: string,
    usd: number,
) {
    return `{${tokenType}} ${rawAmount} ${tokenSymbol} (≈$ ${usd})`
}

export function balanceWithUsd(eth: number, usd: number) {
    return `${eth} ETH (≈$ ${usd})`
}

export function resProjectInsightWebsite(website: string) {
    return `Website  🌐 [${website}]`
}

export function resProjectInsightBlog(blog: string) {
    return `Blog  🌐 [${blog}]`
}

export function resProjectInsightTwitter(twitter: string) {
    return `Twitter👉🏻 [${twitter}]`
}

export function resProjectInsightDiscord(discord: string) {
    return `Discord👉🏻 [${discord}]`
}

export function balanceWithoutUsd(eth: number) {
    return `${eth} ETH`
}

export const simulationBalanceChange = {
    balanceChangeBefore: 'Before ➞',
    balanceChangeAfter: '➞ After',
    separators: '---',
    balanceDiff: '💰Balance Diff.',
    paymentDetailPanelGet: '➞ Get',
    paymentDetailPanelPay: 'Pay ➞',
}

export const apiMapping = {
    transaction_risks_summary: {
        fatal_risk: 'Extreme Risk',
        high_risk: 'Medium Risk',
        caution: 'Low Risk',
        no_risk: 'No Detected Risk',
        rule_address_erc20_transfer: 'ERC-20 token transfer to known malicious account',
        rule_address_erc20_approve: 'ERC-20 token approval for known malicious contract',
        rule_address_erc721_set_approval_for_all:
            'NFT global approval for known malicious contract',
        rule_address_eip712_transfer:
            'Signing may pre-approve transfers to known malicious account',
        rule_address_withdraw_ape_coin: 'Ape transfer to known malicious contract',
        rule_address_increase_approval: 'Token approval for known malicious contract',
        rule_address_increase_allowance: 'Token allowance for known malicious contract',
        rule_address_eth_sign: 'High-risk signing method (eth_sign)',
        rule_address_eth_signature: 'Malicious address detected',
        rule_address_eth_transfer_payable_contract: 'Transfer to known malicious contract',
        rule_address_eth_transfer_contract: 'Transfer to known malicious contract',
        rule_address_eth_transfer_eoa: 'Token transfer to known malicious account',
        rule_url_scam_wrs_dangerous: 'Known malicious website',
        rule_address_blocklist: 'Known malicious account',
        rule_url_scam_dna: 'AI-flagged suspicious website',
        rule_domain_short_available_time_with_erc20_transfer:
            'Short duration domain & ERC-20 token transfer',
        rule_domain_short_available_time_with_eip712_transfer:
            'Short duration domain & signing may pre-approve transfers',
        rule_domain_short_available_time_with_erc20_approve:
            'Short duration domain & ERC-20 token approval for contract',
        rule_domain_short_available_time_with_erc721_setapprovalforall:
            'Short duration domain & NFT global approval',
        rule_domain_short_available_time_with_payable_contract:
            'Short duration domain & ERC-20 token transfer to contract',
        rule_domain_short_available_time_with_contract:
            'Short duration domain & transaction request',
        rule_domain_short_available_time_with_eoa:
            'Short duration domain & ERC-20 token transfer to account',
        rule_ssl_domain_mismatch_with_erc20_transfer:
            'Domain-SSL mismatch & ERC-20 transfer to account',
        rule_ssl_domain_mismatch_with_eip712_transfer:
            'Domain-SSL mismatch & signing may pre-approve transfers',
        rule_ssl_domain_mismatch_with_erc20_approve:
            'Domain-SSL mismatch & ERC-20 approval for contract',
        rule_ssl_domain_mismatch_with_erc721_setapprovalforall:
            'Domain-SSL mismatch & NFT global approval',
        rule_ssl_domain_mismatch_with_payable_contract:
            'Domain-SSL mismatch & token transfer to contract',
        rule_ssl_domain_mismatch_with_contract: 'Domain-SSL mismatch & transaction request',
        rule_ssl_domain_mismatch_with_eoa: 'Domain-SSL mismatch & token transfer to account',
        rule_url_ssl_domain_mismatch: 'Domain-SSL mismatch',
        rule_domain_short_available_time_with_withdrawapecoin:
            'Short duration domain & withdraw ape coin',
        rule_ssl_domain_mismatch_with_withdrawapecoin: 'Domain-SSL mismatch & withdraw ape',
        rule_domain_short_available_time_with_increaseapproval:
            'Short duration domain & increase approval',
        rule_ssl_domain_mismatch_with_increaseapproval: 'Domain-SSL mismatch & increase approval',
        rule_domain_short_available_time_with_increaseallowance:
            'Short duration domain & increase allowance',
        rule_ssl_domain_mismatch_with_increaseallowance: 'Domain-SSL mismatch & increase allowance',
        rule_ssl_short_available_time_with_erc20_transfer:
            'SSL certificate expires soon & ERC-20 transfer to account',
        rule_ssl_short_available_time_with_eip712_transfer:
            'SSL expires soon & signing may pre-approve transfers',
        rule_ssl_short_available_time_with_erc20_approve:
            'SSL certificate expires soon & ERC-20 approval for contract',
        rule_ssl_short_available_time_with_erc721_setapprovalforall:
            'SSL certificate expires soon & NFT global approval',
        rule_ssl_short_available_time_with_payable_contract:
            'SSL certificate expires soon & token transfer to contract',
        rule_ssl_short_available_time_with_contract:
            'SSL certificate expires soon & transaction request',
        rule_ssl_short_available_time_with_eoa:
            'SSL certificate expires soon & Token Transfer to Account',
        rule_domain_short_create_time_with_erc20_transfer:
            'Recently created domain & token transfer to contract',
        rule_domain_short_create_time_with_eip712_transfer:
            'Recently created domain & signing may pre-approve transfers',
        rule_domain_short_create_time_with_erc20_approve:
            'Recently created domain & ERC-20 token approval for contract',
        rule_domain_short_create_time_with_erc721_setapprovalforall:
            'Recently created domain & NFT global approval',
        rule_domain_short_create_time_with_payable_contract:
            'Recently created domain & token transfer to contract',
        rule_domain_short_create_time_with_contract:
            'Recently created domain & transaction request',
        rule_domain_short_create_time_with_eoa:
            'Recently created domain & token transfer to account',
        rule_ssl_short_create_time_with_erc20_transfer:
            'Recent SSL certificate & ERC-20 token transfer to account',
        rule_ssl_short_create_time_with_eip712_transfer:
            'Recent SSL certificate & signing may pre-approve transfers',
        rule_ssl_short_create_time_with_erc20_approve:
            'Recent SSL certificate & ERC-20 token approval for contract',
        rule_ssl_short_create_time_with_erc721_setapprovalforall:
            'Recent SSL certificate & NFT global approval request',
        rule_ssl_short_create_time_with_payable_contract:
            'Recent SSL certificate & token transfer to contract',
        rule_ssl_short_create_time_with_contract: 'Recent SSL certificate & transaction request',
        rule_ssl_short_create_time_with_eoa: 'Recent SSL certificate & account transaction',
        rule_address_erc20_transfer_caution: 'ERC-20 token transfer to account',
        rule_address_erc20_approve_caution: 'ERC-20 token approval',
        rule_address_erc721_set_approval_for_all_caution: 'NFT global approval',
        rule_address_eip712_transfer_caution: 'Signing may pre-approve transfers',
        rule_address_eth_transfer_payable_contract_caution: 'Token transfer to contract',
        rule_address_eth_transfer_contract_caution:
            'Contract may have the ability to transfer assets',
        rule_address_eth_transfer_eoa_caution: 'Token transfer to account',
        rule_domain_short_available_time: 'Short duration domain',
        rule_ssl_short_available_time: 'SSL certificate expires soon',
        rule_address_contract_not_public: 'Unverifiable private contract',
        rule_address_eth_signature_caution: 'Unrecognized transaction type',
        rule_domain_short_create_time: 'Recently created domain',
        rule_ssl_short_create_time: 'Recent SSL certificate',
        rule_ssl_short_available_time_with_withdrawapecoin:
            'SSL certificate expires soon & withdraw ape',
        rule_domain_short_create_time_with_withdrawapecoin:
            'Recently created domain & withdraw ape',
        rule_ssl_short_create_time_with_withdrawapecoin: 'Recent SSL certificate & withdraw ape',
        rule_address_withdraw_ape_coin_caution: 'withdraw ape coin',
        rule_ssl_short_available_time_with_increaseapproval:
            'SSL certificate expires soon & increase approval',
        rule_domain_short_create_time_with_increaseapproval:
            'Recently created domain & increase approval',
        rule_ssl_short_create_time_with_increaseapproval:
            'Recent SSL certificate & increase approval',
        rule_address_increase_approval_caution: 'increase approval',
        rule_ssl_short_available_time_with_increaseallowance:
            'SSL certificate expires soon & increase allowance',
        rule_domain_short_create_time_with_increaseallowance:
            'Recently created domain & increase allowance',
        rule_ssl_short_create_time_with_increaseallowance:
            'Recent SSL certificate & increase allowance',
        rule_address_increase_allowance_caution: 'increase allowance',
    },
    transaction_risks: {
        factor_url_blocklist: 'Known malicious website',
        factor_url_ai_scam: 'AI-flagged suspicious website',
        factor_address_blocklist: 'Known malicious account',
        factor_eth_sign: 'High-risk signature type',
        factor_contract_not_public: 'Unverifiable private contract',
        factor_uncategorized_signature: 'Unrecognized transaction type',
        factor_erc20_transfer: 'ERC-20 token transfer',
        factor_erc20_approve: 'ERC-20 token approval',
        factor_eip712_transfer: 'Signature Request',
        factor_erc721_setapprovalforall: 'NFT global approval',
        factor_ssl_short_create: 'Recent SSL certificate',
        factor_ssl_short_available: 'SSL certificate expires soon',
        factor_domain_short_create: 'Recent website domain',
        factor_domain_short_available: 'Short-term domain validity',
        factor_p2p_transfer: 'Transfer to account',
        factor_contract_transfer: 'Transfer to contract',
        factor_ssl_domain_mismatch: 'SSL certificate-domain mismatch',
        factor_payable_contract_transfer: 'Contract may have the ability to transfer assets',
        factor_withdraw_ape_coin: 'Withdraw Ape Coin',
        factor_increase_approval: 'Increase Approval',
        factor_increase_allowance: 'Increase Allowance',
    },
}
