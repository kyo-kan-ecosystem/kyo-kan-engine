import { WorkflowState } from "../workflow/protocol";


export { Context } from "./base/context/index.cjs";


export type ExecutorState = {
    executorId: any
}
export type BordState = {
    init: any
}


export type StateType = {
    subBordInit?: BordState,
    workflow?: WorkflowState,
    executor?: ExecutorState
}

export type PartialSateType = Partial<StateType>




export type executeMode = 'wait' | 'go' | 'goSub' | 'end' | 'back' | 'rewindWorokflow' | 'rewindReturn';
export type State = {
    mode: executeMode

} | StateType

export type ExecutionResult = {
    state: State;
    results: any[];


}

