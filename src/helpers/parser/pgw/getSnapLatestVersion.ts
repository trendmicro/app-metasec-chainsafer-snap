import type { TGetSnapLatestVersion } from '../../../helpers/parser/pgw/types/getSnapLatestVersion.type'

import { parserMapping } from '../../../helpers/parser/parser'

const getSnapLatestVersion: TGetSnapLatestVersion = (responseBody) => {
    return {
        latestForceUpdateVersion: parserMapping<string>(
            responseBody,
            'latest_force_update_version',
            ''
        ),
        latestVersion: parserMapping<string>(responseBody, 'latest_version', ''),
    }
}

export default getSnapLatestVersion
