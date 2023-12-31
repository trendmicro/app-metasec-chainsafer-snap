import { panel, text, divider } from '@metamask/snaps-ui'
import { headingText, serviceError, updateAlert } from '../../constants/content'
import { TUpdateAlertPanel } from './types/panels.type'
import { isGreaterVersion } from '../versionCheck'
import { VERSION } from '../../constants/config'

export const convertToUpdateAlertPanel: TUpdateAlertPanel = (result, error) => {
    if (error) {
        return {
            panel: panel([
                text(`${headingText.latestVersion}`),
                text(`${serviceError.serviceError}`),
                text(`${JSON.stringify(error)}`),
            ]),
            isForceUpdate: false,
        }
    }

    const isUpdateAvailable = isGreaterVersion(result.latestVersion, VERSION)
    const isForceUpdate = isGreaterVersion(result.latestForceUpdateVersion, VERSION)

    if (isUpdateAvailable) {
        if (isForceUpdate) {
            return {
                panel: panel([divider(), text(`${updateAlert.forceUpdate}`), divider()]),
                isForceUpdate,
            }
        } else {
            return {
                panel: panel([divider(), text(`${updateAlert.snapUpdate}`), divider()]),
                isForceUpdate,
            }
        }
    } else {
        return {
            panel: panel([]),
            isForceUpdate,
        }
    }
}
