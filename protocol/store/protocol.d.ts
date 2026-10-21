export interface StoreInterface<ValueType> {
    get(key: string): ValueType
    set(key: string, value: ValueType, epoc: number | undefined): void




}