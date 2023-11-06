import { panel, heading, text, divider } from '@metamask/snaps-ui'
import { TSimulationPanel } from './types/panels.type'
const { formatEther } = require('@ethersproject/units')

export const convertToSimulationPanel: TSimulationPanel = (result, error) => {
    if (error) {
        return panel([
            heading('Transaction Simulation'),
            divider(),
            text(`⛔️**Oops, service have something problems...**!😑`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    if (result.evmErrAddress != '' || result.evmErrMessage != '') {
        return panel([
            heading('Transaction Simulation'),
            divider(),
            text(`⛔️**Oops, service have something problems...**!😑`),
            text(`address: ${result.evmErrAddress}`),
            text(`error: ${result.evmErrMessage}`),
        ])
    }

    if (result.senderAssetChange == null && result.contracts == null) {
        return panel([])
    }

    let paymentDetailPanel = []
    let tokenChangePanel = []
    let contractPanel = []
    let balanceChangePanel = []

    if (result.senderAssetChange != null && result.senderAssetChange.balanceDiff != null) {
        const originWei = parseInt(result.senderAssetChange.balanceDiff.origin)
        const originUSD = parseInt(result.senderAssetChange.balanceDiff.originDollarValue)
        const afterWei = parseInt(result.senderAssetChange.balanceDiff.after)
        const afterUSD = parseInt(result.senderAssetChange.balanceDiff.afterDollarValue)
        const diffWei = afterWei - originWei
        const diffUSD = afterUSD - originUSD

        paymentDetailPanel = [
            text(`Pay ➞`),
            text(
                `${convertWeiToEth(diffWei.toString())} Eth${
                    Number.isNaN(diffUSD) ? `` : ` ($ ${diffUSD})`
                }`
            ),
        ]
        balanceChangePanel = [
            heading('Balance Changes'),
            divider(),
            text(`Before ➞`),
            text(
                `${convertWeiToEth(originWei.toString())} Eth ${
                    Number.isNaN(originUSD) ? `` : ` ($ ${originUSD})`
                }`
            ),
            text(`➞ After`),
            text(
                `${convertWeiToEth(afterWei.toString())} Eth ${
                    Number.isNaN(afterUSD) ? `` : ` ($ ${afterUSD})`
                }`
            ),
            text(`**---**`),
            text(`**💰Balance Diff.**`),
            text(
                `${convertWeiToEth(diffWei.toString())} Eth${
                    Number.isNaN(diffUSD) ? `` : ` ($ ${diffUSD})`
                }`
            ),
        ]
    }

    // payment detail panel
    if (
        result.senderAssetChange != null &&
        result.senderAssetChange.tokenChanges != null &&
        result.senderAssetChange.tokenChanges.length > 0
    ) {
        result.senderAssetChange.tokenChanges.forEach(function (tokenChange) {
            tokenChangePanel.push(
                text(`➞ ${tokenChange.direction == 'in' ? 'Get' : 'Sell'}`),
                text(`${tokenChange.name} ($${tokenChange.dollarValue})`)
            )
        })
        tokenChangePanel.push(text(`**---**`))
    }

    // contract panel
    if (result.contracts != null && result.contracts.length > 0) {
        contractPanel.push(
            text(
                `**Via ${result.contracts[0].contractName} and other ${
                    result.contracts.length - 1
                } contracts ✅**`
            )
        )
        result.contracts.forEach(function (contract, index) {
            contractPanel.push(
                text(`${index + 1}.[${contract.contractName}] Contract address 👉[${
                    contract.address
                }] 🌐[Contract: ${contract.isPublic == true ? 'Open✅' : 'Private❗️'}] ${
                    parseFloat(contract.fee) > 0
                        ? `▶ ${convertWeiToEth(contract.fee).toString()} ETH`
                        : ''
                } ${
                    Number.isNaN(parseInt(contract.feeDollarValue))
                        ? ''
                        : `($${contract.feeDollarValue})`
                }
        `)
            )
        })
    }

    return panel([
        text(`**You're about to buy a NFT via a smart contract.**`),
        divider(),
        ...paymentDetailPanel,
        ...tokenChangePanel,
        ...contractPanel,
        ...balanceChangePanel,
    ])
}

function convertWeiToEth(wei: string): string {
    if (Number.isNaN(parseInt(wei))) {
        return '0'
    }
    let eth = formatEther(wei)

    return eth
}
