import postTransactionRisks from '../../../helpers/parser/pgw/postTransactionRisks'
import postTransactionRiskSummary from '../../../helpers/parser/pgw/postTransactionRiskSummary'
import postTransactionSimulation from '../../../helpers/parser/pgw/postTransactionSimulation'
import getSnapLatestVersion from '../../../helpers/parser/pgw/getSnapLatestVersion'
import getTokenInfo from '../../../helpers/parser/pgw/getTokenInfo'

export default {
    POST_TRANSACTION_RISKS: postTransactionRisks,
    POST_TRANSACTION_RISK_SUMMARY: postTransactionRiskSummary,
    POST_TRANSACTION_SIMULATION: postTransactionSimulation,
    GET_SNAP_LATEST_VERSION: getSnapLatestVersion,
    GET_TOKEN_INFO: getTokenInfo,
}
