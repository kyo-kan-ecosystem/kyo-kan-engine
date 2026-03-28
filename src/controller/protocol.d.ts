import { exec } from "child_process";
import { WorkflowState } from "../workflow/protocol";


export { Context } from "../context/index.cjs";

export type ExecuteMode = 'enter' | 'wait' | 'go' | 'goSub' | 'end' | 'back' | 'rewindWorokflow' | 'rewindReturn';
export type ControllStateType = {
    executorId?: string,
    callback?: string,
    executeMode?: ExecuteMode
    subworkflowInit: any
    subworkflowId: any

}


export type StateType = {

    workflow?: WorkflowState,
    controlls?: ControllStateType

}

export type PartialSateType = Partial<StateType>






export type State = {
    mode?: executeMode
} & StateType

export type ExecutionResult = {
    state: State;
    results: any[];


}

