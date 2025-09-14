

export { Context } from "./base/context/index.cjs";


export type ExecutorState = {
    executorId: any
}
export type WorkflowState = {
    id: any,
    subwWorkflow: {
        name: any
        data: any
    },
    data: any



}


export type StateType = {
    workflow: WorkflowState,
    executor: ExecutorState
}




export type executeMode = 'wait' | 'go' | 'goSub' | 'end' | 'back' | 'rewind' | 'rewindReturn';
export type State = {
    mode: executeMode

}

export type ExecutionResult = {
    state: State;
    results: any[];


}