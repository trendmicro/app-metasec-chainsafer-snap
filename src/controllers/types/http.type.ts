export type IHTTPRequestPayload = {
    method: string
    headers: Record<string, string>
    body?: string
    [key: string]: any
}

export type IUrlBase = {
    path: string
    endpoint: string
}

export type IErrorResponse = {
    [key: string]: any
}

export type IResponseError = {
    httpStatusCode: number
    errorCode: number
    traceId: string
    message: string
    dateTime: string
}

export type TMethodFactory = (
    method: string
) => (
    url: IUrlBase,
    request: IHTTPRequestPayload,
    onResponseErrorCode?: Function
) => <T>(isJSONResponse?: boolean) => Promise<[IErrorResponse, T]>
export type TCreateUrlBase = (
    endpoint: string
) => (pathKey: string, replacer?: Function, version?: string) => IUrlBase
export type TPayload = (
    body: Record<string, any>,
    headers: Record<string, string>,
    additions?: Record<string, string>
) => IHTTPRequestPayload
