export const ENABLE_CLIENT_CONSOLE = process.env.ENV === 'dev';
export const APP_PLATFORM = process.env.APP_PLATFORM;
export const API = {
    PGW: {
        base:  process.env.API_PGW_BASE,
        basicLayer: process.env.API_PGW_BASE_LAYER,
        version:process.env.API_PGW_VAESION,
        path: {
            GET_CONTRACT_ADDRESS: process.env.API_PGW_PATH_GET_CONTRACT_ADDRESS,
            POST_INQUIRY_ID: process.env.API_PGW_PATH_POST_INQUIRY_ID,
            GET_TRANSACTION_INQUIRES: process.env.API_PGW_PATH_GET_TRANSACTION_INQUIRES,
            POST_TRANSACTION_RISKS: process.env.API_PGW_PATH_POST_TRANSACTION_RISKS,
            POST_FEEDBACK_CASE: process.env.API_PGW_PATH_POST_FEEDBACK_CASE,
            POST_TRANSACTION_RISK_SUMMARY: process.env.API_PGW_PATH_POST_TRANSACTION_RISK_SUMMARY,
            GET_USER_PROFILE: process.env.API_PGW_PATH_GET_USER_PROFILE,
            POST_CREATE_ORDER: process.env.API_PGW_PATH_POST_CREATE_ORDER,
            POST_TRANSACTION_SIMULATION: process.env.API_PGW_PATH_POST_TRANSACTION_SIMULATION,
        }
    }
}