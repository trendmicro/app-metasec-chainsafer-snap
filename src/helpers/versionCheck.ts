export const isGreaterVersion = (version: string, compareVersion: string) => {
    const versionArray = version.split('.')
    const compareVersionArray = compareVersion.split('.')
    for (let i = 0; i < versionArray.length; i++) {
        if (parseInt(versionArray[i]) > parseInt(compareVersionArray[i])) {
            return true
        }
    }
    return false
}
