export interface StoreInterface<ValueType = any> {
    constractor({ namespace: string, epoc: number })
    get(key: string): Promise<{ value: ValueType, isExist: boolean }>
    set(key: string, value: ValueType, epoc: number | undefined): Promise<void>




}
