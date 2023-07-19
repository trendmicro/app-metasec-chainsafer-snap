import {Buffer} from 'buffer';
import storage from 'controllers/storage';
/**
 * Detect if the wallet injecting the ethereum object is Flask.
 *
 * @returns True if the MetaMask version is Flask, false otherwise.
 */
export const isFlask = async () => {
  const provider = window.ethereum;

  try {
    const clientVersion = await provider?.request({
      method: 'web3_clientVersion',
    });

    const isFlaskDetected = (clientVersion as string[])?.includes('flask');

    return Boolean(provider && isFlaskDetected);
  } catch {
    return false;
  }
};

export const signSignature = async(address:string, message:string): Promise<string> => {
  const from = address;
  // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
  // This uses a Node.js-style buffer shim in the browser.
  const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [msg, from],
  });

  return String(signature)
}

export const getLatestSignUpAccount = async(): Promise<string> => {
  let latestSignUpAccount = storage.get("account")

  const accounts = await window.ethereum.request<string[]>({
    method: 'eth_accounts',
  });

  console.log("getLatestSignUpAccount accounts: ", accounts)

  let currentAccount = accounts?.[0];
  if (!currentAccount) {
    throw new Error('Must accept wallet connection request.');
  }

  for(let i=0;(accounts?.[0]) && i<=accounts.length-1;i++){
    if (accounts[i] === latestSignUpAccount ){
      currentAccount = latestSignUpAccount
    }
  }
  const address = currentAccount;
  console.log('getLatestSignUpAccount account: ', `${ address }`);

  return address
}

export const getLatestSwitchAccount = async(): Promise<string> => {
  const accounts = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  });

  console.log("getCurrentAccount accounts: ", accounts)

  const currentAccount = accounts?.[0];
  if (!currentAccount) {
    throw new Error('Must accept wallet connection request.');
  }

  const address = currentAccount;
  console.log('getCurrentAccount account: ', `${ address }`);

  return address
}