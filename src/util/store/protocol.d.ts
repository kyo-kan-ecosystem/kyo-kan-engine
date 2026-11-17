
export type StoreGetResponse = { value?: any, isExist: boolean }
export interface StoreInterface {
    constractor({ namespace: string, epoc: number })
    get(key: string): Promise<StoreGetResponse>
    set(key: string, value: any, epoc: number | undefined): Promise<void>




}
