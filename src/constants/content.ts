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
    latestVersion:'Latest Version',
    forceUpdate: '[❕ ALERT] Current version is not available anymore! Please visit 🌐“https://chainsafer.stag.nexone.io/snap/#/” to update.',
    snapUpdate: '[❕ ALERT] There is an update of ChainSafer Snap, for better protection, please visit 🌐“https://chainsafer.stag.nexone.io/snap/#/” to update.'
}
   
export const serviceError ={
    serviceError: '⛔️**Oops, service have something problems...**!😬'
}

export const headingText = {
    RiskSummary: 'Risk Summary Check'
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
    },
    transaction_risks: {
        factor_url_blocklist: 'Malicious Website',
        factor_url_ai_scam: 'Scam Website (AI)',
        factor_address_blocklist: 'Malicious Account',
        factor_eth_sign: 'High-Risk Sign',
        factor_contract_not_public: 'Close-Source Contract',
        factor_uncategorized_signature: 'Custom Function Call',
        factor_erc20_transfer: 'ERC-20 Transfer',
        factor_erc20_approve: 'ERC-20 Approve',
        factor_eip712_transfer: 'Signature Request',
        factor_erc721_setapprovalforall: 'SetApprovalForAll',
        factor_ssl_short_create: 'New Certificate',
        factor_ssl_short_available: 'Short-term Certificate Validity',
        factor_domain_short_create: 'New Domain',
        factor_domain_short_available: 'Short-term domain validity',
        factor_p2p_transfer: 'P2P Transfer',
        factor_contract_transfer: 'Transfer to contract',
        factor_ssl_domain_mismatch: 'Domain Mismatch in Cert.',
        factor_payable_contract_transfer: 'Token Transfer via Smart Contract Request',
        factor_withdraw_ape_coin: 'Withdraw Ape Coin',
    },
}
