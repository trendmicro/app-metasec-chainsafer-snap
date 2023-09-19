import { Json } from '@metamask/snaps-types'

export type TSnapState = {
    snapInfo: SnapInfo
}

export type SnapInfo = {
    id: string | undefined
    version: string | undefined
}

export type TGetSnapState = () => Promise<Record<string, Json>>
