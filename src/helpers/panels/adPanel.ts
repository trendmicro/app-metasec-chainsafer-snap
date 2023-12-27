import { panel, divider, text } from '@metamask/snaps-sdk'
import { chainSaferAd } from '../../constants/content'
export function convertAdPanel() {
    return panel([
        divider(),
        text(chainSaferAd.adTitle),
        text(chainSaferAd.adContent),
        divider(),
    ])

}