
export type TParserMapping = <T>(responseBody: Record<string, any>, key: string, defaultValue: any, customParserFunc?: Function) => T

