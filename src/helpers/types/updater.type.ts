export type TNestedKeyUpdater = (
    context: Record<string, any>,
    nestedKey: string,
    value: any
) => void
export type TUpdater = (
    context: Record<string, any>,
    keys: string[],
    values: any[]
) => Record<string, any>
