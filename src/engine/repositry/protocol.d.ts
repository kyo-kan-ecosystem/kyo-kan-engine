
import type { ExecuteMode } from "../../sequence/protocol"


type EngineConfigure<SequenceType = ExecuteMode> = {
    root: {
        workflow: {
            plugin: string,
            id: string
        }
    },
    executor: {
        enterFunc: string
    },
    sequence: {
        start: SequenceType,
        resume: SequenceType,
        callback: SequenceType,
        go: SequenceType

    },
    boot: {
        callback: string

    }
}


export type Repositry = { EngineConfigure }