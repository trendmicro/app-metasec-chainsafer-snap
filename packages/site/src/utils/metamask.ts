import { Buffer } from 'buffer'
import storage from 'controllers/storage'
import { showAccount, showAccounts } from './eoa'
/**
 * Detect if the wallet injecting the ethereum object is Flask.
 *
 * @returns True if the MetaMask version is Flask, false otherwise.
 */
export const isFlask = async () => {
  const provider = window.ethereum

  try {
    const clientVersion = await provider?.request({
      method: 'web3_clientVersion',
    })

    const isFlaskDetected = (clientVersion as string[])?.includes('flask')

    return Boolean(provider && isFlaskDetected)
  } catch {
    return false
  }
}

export const signSignature = async (address: string, message: string): Promise<string> => {
  const from = address
  // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
  // This uses a Node.js-style buffer shim in the browser.
  const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`

  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [msg, from],
  })

  return String(signature)
}

export const requestAccount = async (): Promise<[(string | undefined)[], string]> => {
  const accounts = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  })
  
  const currentAccount = accounts?.[0]
  if (!currentAccount) {
    throw new Error('Must accept wallet connection request.')
  }

  console.log('currentAccount ', `${showAccount(currentAccount)}`)
  console.log('accounts: ', showAccounts(accounts))

  return [accounts, currentAccount]
}

export const getAccounts = async (): Promise<[(string | undefined)[], string]> => {
  const accounts = await window.ethereum.request<string[]>({
    method: 'eth_accounts',
  })

  const currentAccount = accounts?.[0]
  if (!currentAccount) {
    throw new Error('Must connect wallet to login ChainSafer.')
  }

  return [accounts, currentAccount]
}
