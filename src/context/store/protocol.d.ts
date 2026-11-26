import { StoreInterface } from "../../../interfacade/store/protocol"
import type { Context } from "../class.cjs"



export type ContextStoreValue = {
    context: Context,
    scenarioId: any
}
export type ContextStoreSeriaraizedValue = {
    context: any,
    scenarioId: any
}

export type ContextStore = StoreInterface<ContextStoreValue>