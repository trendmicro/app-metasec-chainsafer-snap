import {Buffer} from 'buffer';
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
  console.log('signSignature address: ', `${ address }`);
  console.log('signSignature message: ', `${ message }`);

  const from = address;
  // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
  // This uses a Node.js-style buffer shim in the browser.
  const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

  console.log('signSignature msg: ', `${ msg }`);

  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [msg, from],
  });

  console.log('signSignature signature: ', `${ signature }`);

  return String(signature)
}

export const getCurrentAccount = async(): Promise<string> => {
  const accounts = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  });

  console.log("accounts: ", accounts)

  const currentAccount = accounts?.[0];
  if (!currentAccount) {
    throw new Error('Must accept wallet connection request.');
  }

  const address = currentAccount;
  console.log('account: ', `${ address }`);

  return address
}