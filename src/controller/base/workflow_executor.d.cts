export type State = import("../protocol").State;
export type ExecutionResult = {
    /**
     * - 実行後の状態
     */
    state: State;
    /**
     * - レスポンス単位の配列
     */
    response_units: any[];
};
export type States = {
    /**
     * - 状態を更新する関数
     */
    update: (arg0: State) => void;
};
export type Workflow = {
    /**
     * - 実行関数を取得
     */
    getExecuteFunction: (arg0: any) => Function;
    /**
     * - サブワークフローから戻った時の処理
     */
    returnFromSubworkflow: (arg0: any) => Function;
    /**
     * - 前の状態に戻る
     */
    back: (arg0: any) => Function;
    /**
     * - リセットして戻った時の処理
     */
    returnAsReset: (arg0: any) => Function;
};
export type Workflows = import("./context/workflows.cjs").Workflows;
export type Context = {
    /**
     * - 状態管理オブジェクト
     */
    states: States;
    /**
     * - ワークフロー管理オブジェクト
     */
    workflows: Workflows;
    /**
     * - サブルーチンに移行する関数
     */
    goSub: () => void;
    /**
     * - サブルーチンを終了する関数
     */
    endSub: () => boolean;
    /**
     * - リセット関数
     */
    reset: () => void;
};
export type ExecuteFunction = (arg0: any, arg1: Context) => Promise<ExecutionResult>;
export type executeMode = import("../protocol").executeMode;
/**
 *
 * @typedef {import("../protocol").State} State
 * @typedef {Object} ExecutionResult
 * @property {State} state - 実行後の状態
 * @property {Array} response_units - レスポンス単位の配列
 */
/**
 * @typedef {Object} States
 * @property {function(State): void} update - 状態を更新する関数
 */
/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻った時の処理
 * @property {function(Object): Function} back - 前の状態に戻る
 * @property {function(Object): Function} returnAsReset - リセットして戻った時の処理
 */
/**
 * @typedef {import("./context/workflows.cjs").Workflows} Workflows
 *
 *
 */
/**
 * @typedef {Object} Context
 * @property {States} states - 状態管理オブジェクト
 * @property {Workflows} workflows - ワークフロー管理オブジェクト
 * @property {function(): void} goSub - サブルーチンに移行する関数
 * @property {function(): boolean} endSub - サブルーチンを終了する関数
 * @property {function(): void} reset - リセット関数
 */
/**
 * @typedef {function(*, Context): Promise<ExecutionResult>} ExecuteFunction
 */
/**
 * ワークフローを実行する関数
 * @param {*} request - リクエストオブジェクト
 * @param {ExecuteFunction} firstFunc - 最初に実行する関数
 * @param {Context} context - コンテキストオブジェクト
 * @returns {Promise<{state: State, responses: Array}>} 実行結果
 */
export function executeWorkflow(request: any, firstFunc: ExecuteFunction, context: Context): Promise<{
    state: State;
    responses: any[];
}>;
import { Workflows } from "./context/workflows.cjs";
