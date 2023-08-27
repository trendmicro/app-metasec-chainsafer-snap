import { IPostTransactionSimulationResponseBody } from "../types/postTransactionSimulation.type";

export const SimulationResponse: IPostTransactionSimulationResponseBody = {
    "evm_err_address": "",
    "evm_err_message": "",
    "has_simulation_result": true,
    "txn_method_name": "",
    "from_address": "0x9f188e5f9e090bf7647173cc5618bc4eabb2bc0e",
    "to_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
    "sender_asset_change": {
        "address": "0x9f188e5f9e090bf7647173cc5618bc4eabb2bc0e",
        "balance_diff": {
            "origin": "10000000000",
            "after": "5000000000",
            "origin_dollar_value": "100",
            "after_dollar_value": "50",
            "symbol": "eth",
            "name": "ethereum",
            "icon": "https://xxx.png",
            "decimals": 18
        },
        "token_changes": [
            {
                "direction": "in",
                "type": "erc1155",
                "contract_address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
                "symbol": "bat",
                "name": "Basic Attention",
                "icon": "",
                "decimals": 18,
                "dollar_value": "100",
                "description": "",
                "token_id": 50
            },
            {
                "direction": "out",
                "type": "erc1155",
                "contract_address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
                "symbol": "bat",
                "name": "Basic Attention",
                "icon": "",
                "decimals": 18,
                "dollar_value": "100",
                "description": "",
                "token_id": 50
            }
        ]
    },
    "recipient_asset_changes": [],
    "contracts": [
        {
            "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
            "contract_name": "Seaport",
            "is_public": true,
            "fee": "1000000000",
            "fee_dollar_value": "100"
        },
        {
            "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
            "contract_name": "Seaport",
            "is_public": false,
            "fee": "10000000",
            "fee_dollar_value": "100"
        }
    ]
}

export const SimulationErrResponse: IPostTransactionSimulationResponseBody = {
    "evm_err_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
    "evm_err_message": "execution reverted",
    "has_simulation_result": false,
    "txn_method_name": "",
    "from_address": "0x9F188e5F9e090bF7647173CC5618Bc4eaBb2bc0E",
    "to_address": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",
    "sender_asset_change": {
        "address": "0x9F188e5F9e090bF7647173CC5618Bc4eaBb2bc0E",
        "balance_diff": {
            "origin": "",
            "after": "",
            "origin_dollar_value": "",
            "after_dollar_value": "",
            "symbol": "",
            "name": "",
            "icon": "",
            "decimals": 0
        },
        "token_changes": null
    },
    "recipient_asset_changes": null,
    "contracts": [
        {
            "address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
            "contract_name": "Seaport",
            "is_public": true,
            "fee": "",
            "fee_dollar_value": ""
        }
    ]
}