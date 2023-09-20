export interface IGetSnapLatestVersionResponseBody {
    latest_force_update_version: string
    latest_version: string
}

export interface IGetSnapLatestVersionResponseParsed { 
    latestForceUpdateVersion: string
    latestVersion: string
}

export type TGetSnapLatestVersion = (
    responseBody: IGetSnapLatestVersionResponseBody
) => IGetSnapLatestVersionResponseParsed
