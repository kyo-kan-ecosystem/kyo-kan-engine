import { AbstractDispatcher } from "./protocol.class.cjs"

export type StepResult = {

    context: any

} | false | null | undefined

export type StepResults = StepResult[]



export type ProcessCounter = {
    n: number
}

export interface GetModeInterFace {
    getMode: () => any
} 