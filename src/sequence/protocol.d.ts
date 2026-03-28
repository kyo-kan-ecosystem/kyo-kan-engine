import { AbstractDispatcher } from "./protocol.class.cjs"

export type ModeAndContext = {
    mode?: any,
    context?: any

} | false | null | undefined

export type ProcessCounter = {
    n: number
}

export interface GetModeInterFace {
    getMode: () => any
} 