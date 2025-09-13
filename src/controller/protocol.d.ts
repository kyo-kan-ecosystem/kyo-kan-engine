

export { Context } from "./base/context/index.cjs";




export type executeMode = 'wait' | 'go' | 'goSub' | 'end' | 'back' | 'resetBack';
export type State = {
    mode: executeMode

}

export type ExecutionResult = {
    state: State;
    results: any[];


}