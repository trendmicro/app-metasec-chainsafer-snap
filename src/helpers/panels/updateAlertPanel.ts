import { panel, text, divider } from '@metamask/snaps-sdk'
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
                divider(),
            ]),
            isForceUpdate: false,
        }
    }

    const isUpdateAvailable = isGreaterVersion(result.latestVersion, VERSION)
    const isForceUpdate = isGreaterVersion(result.latestForceUpdateVersion, VERSION)

    if (isUpdateAvailable) {
        if (isForceUpdate) {
            return {
                panel: panel([text(`${updateAlert.forceUpdate}`), divider()]),
                isForceUpdate,
            }
        } else {
            return {
                panel: panel([text(`${updateAlert.snapUpdate}`), divider()]),
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
