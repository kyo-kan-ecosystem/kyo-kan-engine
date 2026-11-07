export interface StoreInterface {
    constractor({ namespace: string, epoc: number })
    get(key: string): Promise<{ value: any, isExist: boolean }>
    set(key: string, value: any, epoc: number | undefined): Promise<void>




}
