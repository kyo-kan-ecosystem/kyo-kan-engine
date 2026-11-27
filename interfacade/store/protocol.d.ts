
export type StoreGetResponse<ValueType = any> = { value?: ValueType, isExist: boolean }
export interface StoreInterface<ValueType = any> {

    get(key: string): Promise<StoreGetResponse<ValueType>>
    set(key: string, value: StoreGetResponse<ValueType>, epoc?: number | undefined): Promise<void>




}
