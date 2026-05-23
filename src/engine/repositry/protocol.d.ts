import type { ExecuteMode } from "../../sequence/protocol"

export type EngineConfigure<SequenceType = ExecuteMode> = {
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


