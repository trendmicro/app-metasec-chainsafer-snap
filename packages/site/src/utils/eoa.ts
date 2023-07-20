export const showAccount = (account: string): string => {
    return account.slice(0, 6) + '...' + account.slice(-4)
}

export const showAccounts = (accounts: (string | undefined)[]): string[] => {
    let temp :string[] = []
    for (let i = 0; i < accounts.length; i++) {
        temp[i] = showAccount(accounts[i]!)
    }
    return temp
 }
