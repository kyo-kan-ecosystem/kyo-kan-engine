import { exec } from "child_process";
import { WorkflowState, WorkflowStateMember as WorkflowStateMember } from "../workflow/protocol";
import { ExecuteMode } from "../sequence/protocol";


export type { Context } from "../context/index.cjs";

export type ControllStateType = {
    executorId?: string,
    callback?: string,
    executeMode?: ExecuteMode
    subworkflowInit?: any
    subworkflowName?: any

}


export type StateType = WorkflowStateMember & {


    controlls?: ControllStateType,
    isStart?: boolean,
    isBoot?: boolean

}

export type PartialSateType = Partial<StateType>








export type ExecutionResult = {
    state: StateType;
    results: any[];


}

