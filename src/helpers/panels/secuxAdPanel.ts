import { panel, heading, divider,  text } from '@metamask/snaps-ui'
import { chainSaferAd } from '../../constants/content'
export function convertSecuxAdPanel(){
    return panel([
        text(chainSaferAd.adTitle),
        text(chainSaferAd.adContent),
    ])

}