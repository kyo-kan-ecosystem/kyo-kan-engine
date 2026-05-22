import type { Context } from "../context/index.cjs"
import type { AbstractDispatcher } from "./protocol.class.cjs"

export type StepResult = {

    context: Context

} | false

export type StepResults = StepResult[]

export type DispatchFunction = (context: any, request: any) => Promise<any>[] | Promise<Promise<any>[]>


export type ProcessCounter = {
    n: number
}

export interface GetModeInterFace {
    getMode: () => any
}
export type ExecuteMode = keyof AbstractDispatcher


