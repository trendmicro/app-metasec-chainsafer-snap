import type {
    TPostTransactionSimulation,
    IPostTransactionSimulationAssetChangeBody,
    IPostTransactionSimulationAssetChangeParsed,
    IPostTransactionSimulationContractBody,
    IPostTransactionSimulationContractParsed,
} from '../../../helpers/parser/pgw/types/postTransactionSimulation.type'

import { parserMapping } from '../../../helpers/parser/parser'

const postTransactionSimulation: TPostTransactionSimulation = (responseBody) => {
    let senderAssetChange = null
    if (responseBody.sender_asset_change != null) {
        senderAssetChange = convertToAssetChangeParsed(responseBody.sender_asset_change)
    }

    let recipientAssetChanges = null
    if (
        responseBody.recipient_asset_changes != null &&
        responseBody.recipient_asset_changes.length > 0
    ) {
        recipientAssetChanges = []
        responseBody.recipient_asset_changes.forEach(function (assetChange) {
            recipientAssetChanges.push(convertToAssetChangeParsed(assetChange))
        })
    }

    let contracts = null
    if (responseBody.contracts != null && responseBody.contracts.length > 0) {
        contracts = []
        responseBody.contracts.forEach(function (contract) {
            contracts.push(convertToContractParsed(contract))
        })
    }

    return {
        evmErrAddress: parserMapping<string>(responseBody, 'evm_err_address', ''),
        evmErrMessage: parserMapping<string>(responseBody, 'evm_err_message', ''),
        hasSimulationResult: parserMapping<boolean>(responseBody, 'has_simulation_result', false),
        txnMethodName: parserMapping<string>(responseBody, 'txn_method_name', ''),
        fromAddress: parserMapping<string>(responseBody, 'from_address', ''),
        toAddress: parserMapping<string>(responseBody, 'to_address', ''),
        senderAssetChange: senderAssetChange,
        recipientAssetChanges: recipientAssetChanges,
        contracts: contracts,
    }
}

function convertToAssetChangeParsed(
    assetChange: IPostTransactionSimulationAssetChangeBody
): IPostTransactionSimulationAssetChangeParsed {
    let balanceDiff = null
    if (assetChange.balance_diff != null) {
        balanceDiff = {
            origin: parseFloat(parserMapping<string>(assetChange.balance_diff, 'origin', '')),
            after: parseFloat(parserMapping<string>(assetChange.balance_diff, 'after', '')),
            originDollarValue: parseFloat(
                parserMapping<string>(assetChange.balance_diff, 'origin_dollar_value', '')
            ),
            afterDollarValue: parseFloat(
                parserMapping<string>(assetChange.balance_diff, 'after_dollar_value', '')
            ),
            symbol: parserMapping<string>(assetChange.balance_diff, 'symbol', ''),
            name: parserMapping<string>(assetChange.balance_diff, 'name', ''),
            icon: parserMapping<string>(assetChange.balance_diff, 'icon', ''),
            decimals: parserMapping<number>(assetChange.balance_diff, 'decimals', 0),
        }
    }

    let tokenChanges = null
    if (assetChange.token_changes != null && assetChange.token_changes.length > 0) {
        tokenChanges = []
        assetChange.token_changes.forEach(function (tokenChange) {
            tokenChanges.push({
                direction: parserMapping<string>(tokenChange, 'direction', ''),
                type: parserMapping<string>(tokenChange, 'type', ''),
                contractAddress: parserMapping<string>(tokenChange, 'contract_address', ''),
                symbol: parserMapping<string>(tokenChange, 'symbol', ''),
                name: parserMapping<string>(tokenChange, 'name', ''),
                icon: parserMapping<string>(tokenChange, 'icon', ''),
                decimals: parserMapping<number>(tokenChange, 'decimals', 0),
                dollarValue: parseFloat(parserMapping<string>(tokenChange, 'dollar_value', '')),
                description: parserMapping<string>(tokenChange, 'description', ''),
                tokenId: parserMapping<number>(tokenChange, 'token_id', 0),
                rawAmount: parserMapping<string>(tokenChange, 'raw_amount', ''),
            })
        })
    }

    return {
        address: parserMapping<string>(assetChange, 'address', ''),
        balanceDiff: balanceDiff,
        tokenChanges: tokenChanges,
    }
}

function convertToContractParsed(
    contract: IPostTransactionSimulationContractBody
): IPostTransactionSimulationContractParsed {
    return {
        address: parserMapping<string>(contract, 'address', ''),
        contractName: parserMapping<string>(contract, 'contract_name', ''),
        isPublic: parserMapping<boolean>(contract, 'is_public', false),
        fee: parserMapping<string>(contract, 'fee', ''),
        feeDollarValue: parserMapping<string>(contract, 'fee_dollar_value', ''),
    }
}

export default postTransactionSimulation
