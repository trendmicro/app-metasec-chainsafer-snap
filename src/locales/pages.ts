export const SnapContentMapping = {
    "transaction_risk_type": {
        "severe_risk": "🔴",
        "minor_risk": "🟠",
        "attention_required": "🟡",
    },
    "transaction_risk_summary": {
        "fatal_risk": "❌",
        "high_risk": "🔶",
        "caution": "🟨",
    }
}

export const ApiMapping = {
    "common": {
        "freemium": "Free member",
        "premium": "Premium member",
        "footer": {
            "about": "About",
            "not_scam": "Not a scam?",
            "report_to_us": "Report to us",
            "continue": "Continue",
            "cancel_this_operation": "cancel this Operation"
        },
        "loading": "Loading..."
    },
    "pages": {
        "profile": {
            "plan_title_free": "Free",
            "plan_title_premium": "Premium (Annually)",
            "upgrade_btn_title": "Upgrade",
            "account_title": "Account",
            "expired_date": "Subscription ends on {0}",
            "wait_list_card_title": "Coming soon",
            "wait_list_card_subtitle": "Upgrade to premium to check risk factors",
            "wait_list_card_link": "Get Premium Early Access\n(Join the waiting list)",
            "popup": {
                "error_title": "Error occurred",
                "error_trace_id": "traceId: {0}",
                "error_body": "Please close TM-Chainsafer and try again",
                "error_show_detail": "Show detail >",
                "error_hide_detail": "Hide detail",
                "error_footer": "Contact support"
            },
            "error": {
                "title": "Please close this page and go back to the App"
            }
        },
        "report_scam": {
            "report_scam": "Report scam",
            "not_scam": "Not a scam",
            "address": "Address",
            "input_address": "input address",
            "url": "URL",
            "input_url": "input url",
            "hint": "Provide the suspicious contract address, URL, or both.",
            "lost_asset": "I’ve lost assets 🥲",
            "additional_info": "Additional information",
            "input_comment": "input comment",
            "cancel": "cancel",
            "submit": "submit",
            "error_message": "Fill either address or URL.",
            "popup": {
                "200": {
                    "title": "Submitted successfully!",
                    "body": "",
                    "footer": "Close"
                },
                "400": {
                    "title": "Submission failed.",
                    "body": "Submission failed. Please correct the input and try again. If the error persists, please contact support.",
                    "footer": "Contact support"
                },
                "500": {
                    "title": "Submission failed.",
                    "body": "Please try again later.",
                    "footer": "Close"
                },
                "error_trace_id": "traceId: {0}",
                "error_show_detail": "Show detail >",
                "error_hide_detail": "Hide detail"
            }
        },
        "coupon": {
            "popup": {
                "submit_msg": "submit",
                "input_qrcode": "Type the promo code or scan the QR code to unlock your exclusive offer",
                "general_customer_msg": "*The exclusive offer is available to our co-brand customers.\nFor general version customers, please join the waiting list for the latest release news!",
                "input_placeholder": "input promo code",
                "200": {
                    "card_title": "Success!",
                    "card_sub_title": "Congratulations! You have upgraded to a ChainSafer premium membership.\n\nYour Web3 transactions are now even more secure.",
                    "card_link": "View Membership Details"
                },
                "404": {
                    "card_title": "Upgrade failed",
                    "card_sub_title": "The promo code you entered does not exist in our system. Ensure the promo code is correct and try again. \n\nIf the problem persist, contact our support team for assistance.",
                    "card_link": "Contact support"
                },
                "400": {
                    "card_title": "Upgrade failed",
                    "card_sub_title": "Oops! It looks like the coupon code you entered has already been used or is no longer valid. \n\nPlease check your input and try again with a valid coupon code.",
                    "card_link": "Contact support"
                },
                "401": {
                    "card_title": "Not signed in",
                    "card_sub_title": "Access to this feature requires you to sign in to your ChainSafer account.",
                    "card_link": "Contact support"
                },
                "500": {
                    "card_title": "Service error",
                    "card_sub_title": "We apologize, it appears that an error has occurred. \n\nPlease try again. If the issue persists, contact our customer support team for further assistance.",
                    "card_link": "Contact support"
                },
                "error_trace_id": "traceId: {0}",
                "error_show_detail": "Show detail >",
                "error_hide_detail": "Hide detail",
                "common": {
                    "card_title": "Error",
                    "card_sub_title": "Something goes wrong. Please try again.\n\nIf the issue persists, contact our customer support team for further assistance.",
                    "card_link": "Contact support"
                }
            }
        },
        "transaction_risk": {
            "fatal_risk": "Extreme Risk",
            "high_risk": "Medium Risk",
            "caution": "Low Risk",
            "no_risk": "No Detected Risk",
            "factor_detected": "{0} factor(s) detected",
            "title_details": "Details",
            "title_labels": "Labels",
            "advanced_message": "Advanced check with Chainsight",
            "severe_risk": "Extreme risk",
            "minor_risk": "Medium risk",
            "attention_required": "Low risk",
            "wait_list_card_title": "Coming soon",
            "wait_list_card_subtitle": "Upgrade to premium to check risk factors",
            "wait_list_card_link": "Get Premium Early Access\n(Join the waiting list)",
            "popup": {
                "chainsignt_title": "Coming soon!",
                "chainsight_body": " ChainSafer’s Chainsight integration will be launched in June 2023.",
                "chainsight_footer": {
                    "button": "Close"
                },
                "error_title": "Error occurred",
                "error_trace_id": "traceId: {0}",
                "error_body": "Please close TM-Chainsafer and try again",
                "error_show_detail": "Show detail >",
                "error_hide_detail": "Hide detail",
                "error_footer": "Contact support"
            },
            "error": {
                "title": "Please close this page and go back to the App"
            }
        }
    },
    "api": {
        "transaction_risks_summary": {
            "rule_address_erc20_transfer": "ERC-20 token transfer to known malicious account",
            "rule_address_erc20_approve": "ERC-20 token approval for known malicious contract",
            "rule_address_erc721_set_approval_for_all": "NFT global approval for known malicious contract",
            "rule_address_eip712_transfer": "Signing may pre-approve transfers to known malicious account",
            "rule_address_withdraw_ape_coin": "Ape transfer to known malicious contract",
            "rule_address_eth_sign": "High-risk signing method (eth_sign)",
            "rule_address_eth_signature": "Malicious address detected",
            "rule_address_eth_transfer_payable_contract": "Transfer to known malicious contract",
            "rule_address_eth_transfer_contract": "Transfer to known malicious contract",
            "rule_address_eth_transfer_eoa": "Token transfer to known malicious account",
            "rule_url_scam_wrs_dangerous": "Known malicious website",
            "rule_address_blocklist": "Known malicious account",
            "rule_url_scam_dna": "AI-flagged suspicious website",
            "rule_domain_short_available_time_with_erc20_transfer": "Short duration domain & ERC-20 token transfer",
            "rule_domain_short_available_time_with_eip712_transfer": "Short duration domain & signing may pre-approve transfers",
            "rule_domain_short_available_time_with_erc20_approve": "Short duration domain & ERC-20 token approval for contract",
            "rule_domain_short_available_time_with_erc721_setapprovalforall": "Short duration domain & NFT global approval",
            "rule_domain_short_available_time_with_payable_contract": "Short duration domain & ERC-20 token transfer to contract",
            "rule_domain_short_available_time_with_contract": "Short duration domain & transaction request",
            "rule_domain_short_available_time_with_eoa": "Short duration domain & ERC-20 token transfer to account",
            "rule_ssl_domain_mismatch_with_erc20_transfer": "Domain-SSL mismatch & ERC-20 transfer to account",
            "rule_ssl_domain_mismatch_with_eip712_transfer": "Domain-SSL mismatch & signing may pre-approve transfers",
            "rule_ssl_domain_mismatch_with_erc20_approve": "Domain-SSL mismatch & ERC-20 approval for contract",
            "rule_ssl_domain_mismatch_with_erc721_setapprovalforall": "Domain-SSL mismatch & NFT global approval",
            "rule_ssl_domain_mismatch_with_payable_contract": "Domain-SSL mismatch & token transfer to contract",
            "rule_ssl_domain_mismatch_with_contract": "Domain-SSL mismatch & transaction request",
            "rule_ssl_domain_mismatch_with_eoa": "Domain-SSL mismatch & token transfer to account",
            "rule_url_ssl_domain_mismatch": "Domain-SSL mismatch",
            "rule_domain_short_available_time_with_withdrawapecoin": "Short duration domain & withdraw ape coin",
            "rule_ssl_domain_mismatch_with_withdrawapecoin": "Domain-SSL mismatch & withdraw ape",
            "rule_ssl_short_available_time_with_erc20_transfer": "SSL certificate expires soon & ERC-20 transfer to account",
            "rule_ssl_short_available_time_with_eip712_transfer": "SSL expires soon & signing may pre-approve transfers",
            "rule_ssl_short_available_time_with_erc20_approve": "SSL certificate expires soon & ERC-20 approval for contract",
            "rule_ssl_short_available_time_with_erc721_setapprovalforall": "SSL certificate expires soon & NFT global approval",
            "rule_ssl_short_available_time_with_payable_contract": "SSL certificate expires soon & token transfer to contract",
            "rule_ssl_short_available_time_with_contract": "SSL certificate expires soon & transaction request",
            "rule_ssl_short_available_time_with_eoa": "SSL certificate expires soon & Token Transfer to Account",
            "rule_domain_short_create_time_with_erc20_transfer": "Recently created domain & token transfer to contract",
            "rule_domain_short_create_time_with_eip712_transfer": "Recently created domain & signing may pre-approve transfers",
            "rule_domain_short_create_time_with_erc20_approve": "Recently created domain & ERC-20 token approval for contract",
            "rule_domain_short_create_time_with_erc721_setapprovalforall": "Recently created domain & NFT global approval",
            "rule_domain_short_create_time_with_payable_contract": "Recently created domain & token transfer to contract",
            "rule_domain_short_create_time_with_contract": "Recently created domain & transaction request",
            "rule_domain_short_create_time_with_eoa": "Recently created domain & token transfer to account",
            "rule_ssl_short_create_time_with_erc20_transfer": "Recent SSL certificate & ERC-20 token transfer to account",
            "rule_ssl_short_create_time_with_eip712_transfer": "Recent SSL certificate & signing may pre-approve transfers",
            "rule_ssl_short_create_time_with_erc20_approve": "Recent SSL certificate & ERC-20 token approval for contract",
            "rule_ssl_short_create_time_with_erc721_setapprovalforall": "Recent SSL certificate & NFT global approval request",
            "rule_ssl_short_create_time_with_payable_contract": "Recent SSL certificate & token transfer to contract",
            "rule_ssl_short_create_time_with_contract": "Recent SSL certificate & transaction request",
            "rule_ssl_short_create_time_with_eoa": "Recent SSL certificate & account transaction",
            "rule_address_erc20_transfer_caution": "ERC-20 token transfer to account",
            "rule_address_erc20_approve_caution": "ERC-20 token approval",
            "rule_address_erc721_set_approval_for_all_caution": "NFT global approval",
            "rule_address_eip712_transfer_caution": "Signing may pre-approve transfers",
            "rule_address_eth_transfer_payable_contract_caution": "Token transfer to contract",
            "rule_address_eth_transfer_contract_caution": "Contract may have the ability to transfer assets",
            "rule_address_eth_transfer_eoa_caution": "Token transfer to account",
            "rule_domain_short_available_time": "Short duration domain",
            "rule_ssl_short_available_time": "SSL certificate expires soon",
            "rule_address_contract_not_public": "Unverifiable private contract",
            "rule_address_eth_signature_caution": "Unrecognized transaction type",
            "rule_domain_short_create_time": "Recently created domain",
            "rule_ssl_short_create_time": "Recent SSL certificate",
            "rule_ssl_short_available_time_with_withdrawapecoin": "SSL certificate expires soon & withdraw ape",
            "rule_domain_short_create_time_with_withdrawapecoin": "Recently created domain & withdraw ape",
            "rule_ssl_short_create_time_with_withdrawapecoin": "Recent SSL certificate & withdraw ape",
            "rule_address_withdraw_ape_coin_caution": "withdraw ape coin"
        },
        "transaction_risks": {
            "factor_url_blocklist": "Malicious Website",
            "factor_url_ai_scam": "Scam Website (AI)",
            "factor_address_blocklist": "Malicious Account",
            "factor_eth_sign": "High-Risk Sign",
            "factor_contract_not_public": "Close-Source Contract",
            "factor_uncategorized_signature": "Custom Function Call",
            "factor_erc20_transfer": "ERC-20 Transfer",
            "factor_erc20_approve": "ERC-20 Approve",
            "factor_eip712_transfer": "Signature Request",
            "factor_erc721_setapprovalforall": "SetApprovalForAll",
            "factor_ssl_short_create": "New Certificate",
            "factor_ssl_short_available": "Short-term Certificate Validity",
            "factor_domain_short_create": "New Domain",
            "factor_domain_short_available": "Short-term domain validity",
            "factor_p2p_transfer": "P2P Transfer",
            "factor_contract_transfer": "Transfer to contract",
            "factor_ssl_domain_mismatch": "Domain Mismatch in Cert.",
            "factor_payable_contract_transfer": "Token Transfer via Smart Contract Request",
            "factor_withdraw_ape_coin": "Withdraw Ape Coin"
        }
    },
    "vendor": {
        "chainsafer": {
            "about": "ChainSafer is a Web3 Reputation Services that protects your Web3 transactions. We combine Web2 security expertise with the latest Web3 security developments.\nChainSafer offers:\nWeb2 Protection\nWeb3 Protection\nRisk Summary\nWe are constantly adding features to ChainSafer to give you the best experience. Choose ChainSafer to secure your Web3 transactions."
        }
    }
}
