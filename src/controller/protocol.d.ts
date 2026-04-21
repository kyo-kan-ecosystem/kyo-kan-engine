import { exec } from "child_process";
import { WorkflowState } from "../workflow/protocol";
import { ExecuteMode } from "../sequence/protocol";


export type { Context } from "../context/index.cjs";

export type ControllStateType = {
    executorId?: string,
    callback?: string,
    executeMode?: ExecuteMode
    subworkflowInit?: any
    subworkflowId?: any

}


export type StateType = {

    workflow?: WorkflowState,
    controlls?: ControllStateType,
    isStart?: boolean,
    isBoot?: boolean

}

export type PartialSateType = Partial<StateType>






export type State = StateType

export type ExecutionResult = {
    state: State;
    results: any[];


}

