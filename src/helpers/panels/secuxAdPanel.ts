import { panel, divider,  text } from '@metamask/snaps-ui'
import { chainSaferAd } from '../../constants/content'
export function convertAdPanel(){
    return panel([
        divider(),
        text(chainSaferAd.adTitle),
        text(chainSaferAd.adContent),
    ])

}