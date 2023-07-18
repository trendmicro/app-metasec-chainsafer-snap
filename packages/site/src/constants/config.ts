export const ENABLE_CLIENT_CONSOLE = true
export const API = {
  PGW: {
    // base: 'https://pgw-us1.nexone.io', // prod
    // base: 'https://pgw-us1.stag.nexone.io', //dev-stag
    base: 'https://metapgw-us1.test.mgcp.a1q7.net', //dev-test
    basicLayer: '/api',
    version: 'v1',
    path: {
      GET_CONTRACT_ADDRESS: 'eth/addresses/{address}',
      POST_INQUIRY_ID: 'crypto/transaction-inquiries',
      GET_TRANSACTION_INQUIRES: 'crypto/transaction-inquiries/{inquiry_id}',
      POST_TRANSACTION_RISKS: 'crypto/transaction-risks',
      POST_FEEDBACK_CASE: 'feedback/cases',
      POST_TRANSACTION_RISK_SUMMARY: 'crypto/transaction-risks/summary',
      GET_USER_PROFILE: 'account/users/{user_name}',
      POST_CREATE_ORDER: 'shopping/orders',
    },
  },
}
