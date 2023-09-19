import type { TGeneratedUUIDV4, TGenerateUniqueId } from './types/secret.type'

import CryptoJS from 'crypto-js'

export const generatedUUIDV4: TGeneratedUUIDV4 = () => {
    const id = generateUniqueId(32)
    return `${id.substring(0, 7)}-${id.substring(7, 11)}-${id.substring(11, 15)}-${id.substring(
        15,
        19
    )}-${id.substring(19, 23)}-${id.substring(23)}`
}

export const generateUniqueId: TGenerateUniqueId = (length = 8) => {
    const id = CryptoJS.lib.WordArray.random(length / 2).toString()
    return id.substring(0, length)
}
