import getAddressInfo from '../../../helpers/parser/pgw/getAddressInfo'
import postInquiryId from '../../../helpers/parser/pgw/postInquiryId'
import getTransactionInquires from '../../../helpers/parser/pgw/getTransactionInquires'
import postTransactionRisks from '../../../helpers/parser/pgw/postTransactionRisks'
import postFeedbackCase from '../../../helpers/parser/pgw/postFeedbackCase'
import postTransactionRiskSummary from '../../../helpers/parser/pgw/postTransactionRiskSummary'
import getUserProfile from '../../../helpers/parser/pgw/getUserProfile'
import postCreateOrder from '../../../helpers/parser/pgw/postCreateOrder'
import postTransactionSimulation from '../../../helpers/parser/pgw/postTransactionSimulation'

export default {
  GET_CONTRACT_ADDRESS: getAddressInfo,
  POST_INQUIRY_ID: postInquiryId,
  GET_TRANSACTION_INQUIRES: getTransactionInquires,
  POST_TRANSACTION_RISKS: postTransactionRisks,
  POST_FEEDBACK_CASE: postFeedbackCase,
  POST_TRANSACTION_RISK_SUMMARY: postTransactionRiskSummary,
  GET_USER_PROFILE: getUserProfile,
  POST_CREATE_ORDER: postCreateOrder,
  POST_TRANSACTION_SIMULATION: postTransactionSimulation,
}
