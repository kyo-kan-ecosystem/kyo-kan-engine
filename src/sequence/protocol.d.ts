import type { AbstractDispatcher } from "./protocol.class.cjs"

export type StepResult = {

    context: any

} | false

export type StepResults = StepResult[]

export type DispatchFunction = (request: any, context: any) => Promise<any>[]


export type ProcessCounter = {
    n: number
}

export interface GetModeInterFace {
    getMode: () => any
}
export type ExecuteMode = keyof AbstractDispatcher


