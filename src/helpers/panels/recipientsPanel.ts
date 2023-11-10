import { panel, heading, text } from '@metamask/snaps-ui'
import { headingText } from '../../constants/content'
export function convertToRecipientsPanel() {
    return panel([
        heading(headingText.recipientsPanel),
        text(
            'This transaction goes thru 4 contracts/ recipients, 1 of them might exist security concern:'
        ),
        text('{CA} '),
        text('0xed1bd4a5244d35be12e84a3e9821290032a47a99 🚨Label: phishing_Etherscan'),
    ])
}
