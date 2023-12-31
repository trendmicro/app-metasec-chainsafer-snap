export enum ETHEREUM_METHOD {
    REQUEST_ACCOUNT = 'eth_requestAccounts',
    SEND_TRANSACTION = 'eth_sendTransaction',
    SIGN_TYPED_DATA = 'eth_signTypedData',
    SIGN = 'eth_sign',
}

export type TWalletEventMethod =
    | ETHEREUM_METHOD.REQUEST_ACCOUNT
    | ETHEREUM_METHOD.SEND_TRANSACTION
    | ETHEREUM_METHOD.SIGN_TYPED_DATA
    | ETHEREUM_METHOD.SIGN
