import {
    postTransactionRisk,
    postTransactionSimulation,
    postTransactionRiskSummary,
    getSnapLatestVersion,
} from '../controllers/chainsafer'
import { OnTransactionHandler, OnTransactionResponse } from '@metamask/snaps-types'
import { panel, divider, heading, text } from '@metamask/snaps-ui'
import { riskIconMapping, apiMapping, updateAlert,serviceError } from '../constants/content'
import { IResponseError } from '../controllers/types/http.type'
import { IPostTransactionRisksResponseParsed } from '../helpers/parser/pgw/types/postTransactionRisks.type'
import { IPostTransactionSimulationResponseParsed } from '../helpers/parser/pgw/types/postTransactionSimulation.type'
import { IPostTransactionRiskSummaryResponseParsed } from '../helpers/parser/pgw/types/postTransactionRiskSummary.type'
import { TTransactionInsightLayout } from './types/snapContent.type'
import Logger from '../controllers/logger'
import { isGreaterVersion } from './versionCheck'

const logger = new Logger('[helpers.snapContent]')
const { formatEther } = require('@ethersproject/units')

export const transactionInsightLayout: TTransactionInsightLayout = async (
    { transactionOrigin, chainId, transaction },
    state
) => {
    if (transaction) {
        const [latestVersionResult, latestVersionError] = await getSnapLatestVersion()
        const isUpdateAvailable = isGreaterVersion(
            latestVersionResult.latestVersion,
            state.snapInfo.version
        )
        const isForceUpdate = isGreaterVersion(
            latestVersionResult.latestForceUpdateVersion,
            state.snapInfo.version
        )
        let updateAlertPanel = convertToUpdateAlertPanel(
            isUpdateAvailable,
            isForceUpdate,
            latestVersionError
        )

        if (isForceUpdate) {
            return {
                content: panel([updateAlertPanel]),
            }
        }

        const [
            [riskSummaryResult, riskSummaryError],
            [riskResult, riskError],
            [simulationResult, simulationError],
        ] = await Promise.all([
            postTransactionRiskSummary(transactionOrigin, transaction),
            postTransactionRisk(transactionOrigin, transaction),
            postTransactionSimulation(chainId, transaction),
        ])

        let riskPanel = convertToRiskPanel(riskResult, riskError)
        let riskSummaryPanel = convertToRiskSummaryPanel(riskSummaryResult, riskSummaryError)
        let simulationPanel = convertToSimulationPanel(simulationResult, simulationError)

        let displayPanel = panel([])
        if (riskSummaryResult.severity == 'caution') {
            displayPanel = panel([
                updateAlertPanel,
                simulationPanel,
                divider(),
                riskSummaryPanel,
                divider(),
                riskPanel,
            ])
        } else {
            displayPanel = panel([
                updateAlertPanel,
                riskSummaryPanel,
                divider(),
                riskPanel,
                divider(),
                simulationPanel,
            ])
        }

        return {
            content: displayPanel,
        }
    }

    return { content: panel([text(`⛔️**Oops, transaction is null**!😬`)]) }
}

function convertToUpdateAlertPanel(isUpdateAvailable: boolean, isForceUpdate: boolean, error) {
    logger.log('Snap Latest Version error:', error, error != ({} as IResponseError))
    if (error) {
        return panel([
            text(`${updateAlert.latestVersion}`),
            text(`${serviceError.serviceError}`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (isUpdateAvailable) {
        if (isForceUpdate) {
            return panel([
                divider(),
                text(`${updateAlert.forceUpdate}`),
                divider(),
            ])
        } else {
            return panel([
                divider(),
                text(`${updateAlert.snapUpdate}`),
                divider(),
            ])
        }
    } else {
        return panel([])
    }
}

function convertToRiskSummaryPanel(
    result: IPostTransactionRiskSummaryResponseParsed,
    error: IResponseError
) {
    if (error) {
        return panel([
            heading(`Risk Summary Check`),
            text(`⛔️**Oops, service have something problems...**!😬`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    return panel([
        heading(
            `${riskIconMapping.transaction_risks_summary[result.severity]} ${
                apiMapping.transaction_risks_summary[result.severity]
            }`
        ),
        text(`**${apiMapping.transaction_risks_summary[result.ruleName]}**`),
    ])
}

function convertToRiskPanel(result: IPostTransactionRisksResponseParsed, error: IResponseError) {
    logger.log('Transaction Risk error:', error, error != ({} as IResponseError))
    if (error) {
        return panel([
            text(`**- Risky factors -**`),
            text(`⛔️**Oops, service have something problems...**!😬`),
            text(`${JSON.stringify(error)}`),
        ])
    }

    if (result == null) {
        return panel([])
    }

    return panel([
        text(`**- Risky factors -**`),
        ...result.factors.map((insight) =>
            panel([
                text(
                    `${riskIconMapping.transaction_risk_type[insight.type]} ${
                        apiMapping.transaction_risks[insight.name]
                    }`
                ),
                ...insight.message.split('\n').map((message) => text(`${message}`)),
            ])
        ),
    ])
}

function convertToSimulationPanel(
    result: IPostTransactionSimulationResponseParsed,
    error: IResponseError
) {
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

    logger.log('convertToSimulationPanel result:', result)

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
