export const VERSION = process.env.VERSION
export const ENABLE_CLIENT_CONSOLE = process.env.ENV === 'dev'
export const APP_PLATFORM = process.env.APP_PLATFORM
export const API = {
    PGW: {
        base: process.env.API_PGW_BASE,
        basicLayer: process.env.API_PGW_BASE_LAYER,
        version: process.env.API_PGW_VAESION,
        path: {
            POST_TRANSACTION_RISKS: process.env.API_PGW_PATH_POST_TRANSACTION_RISKS,
            POST_TRANSACTION_RISK_SUMMARY: process.env.API_PGW_PATH_POST_TRANSACTION_RISK_SUMMARY,
            POST_TRANSACTION_SIMULATION: process.env.API_PGW_PATH_POST_TRANSACTION_SIMULATION,
            GET_SNAP_LATEST_VERSION: process.env.API_PGW_PATH_GET_SNAP_LATEST_VERSION,
            GET_TOKEN_INFO: process.env.API_PGW_PATH_GET_TOKEN_INFO,
            GET_ADDRESS_LABEL: process.env.API_PGW_PATH_GET_ADDRESS_LABEL,
        },
    },
}
