export type Workflow = {
    /**
     * - 実行関数を取得
     */
    getExecuteFunction: (arg0: any) => Function;
    /**
     * - サブワークフローに入る
     */
    getSubworkflow: (arg0: any) => Function;
    /**
     * - サブワークフローから戻る
     */
    returnFromSubworkflow: (arg0: any) => Function;
    /**
     * - 前の状態に戻る
     */
    back: (arg0: any) => Function;
};
export type BranchState = {
    branch?: {
        bord: any;
        state: any;
    };
};
export type ContextClasses = {
    bords: typeof Bords;
    repositries: typeof Repositries;
    states: typeof States;
    workflows: typeof Workflows;
    histories: typeof Histories;
};
export type ContextInit = {
    repositries: any;
    bords: any;
    repositries: any;
    workflows: any;
    histories: any;
    functions?: any;
};
/**
 * @typedef {{
 *   repositries:any,
 *   bords:any,
 *   repositries:any,
 *   workflows:any,
 *   histories:any,
 *   functions?:any}} ContextInit
 */
export class Context {
    /**
     * @param {ContextInit} [initData={}]
     * @param {ContextClasses} classes
     */
    constructor(initData?: ContextInit, classes?: ContextClasses);
    /**
     * @type {States}
     */
    states: States;
    /**
     * @type {Repositries}
     */
    repositries: Repositries;
    /**
     * @type {Bords}
     */
    bords: Bords;
    innerSession: string;
    /**
     * @type {{[k in string]:Function}}
     */
    functions: { [k in string]: Function; };
    /**
     * @type {Workflows}
     */
    workflows: Workflows;
    /**
     * @type {Histories}
     */
    histories: Histories;
    /**
     *
     * @param {*} state
     * @param {*} request
     */
    forward(state: any, request: any): void;
    goSub(): void;
    endSub(): void;
    reset(): void;
    split(splitCount: any): any[];
    initRoot(rootFlow?: string, psuedoCalleId?: string): void;
}
import { Bords } from "./bords/bords.cjs";
import { Repositries } from "./repositries";
import { States } from "./state/states.cjs";
import { Workflows } from "./workflows.cjs";
import { Histories } from "./histories.cjs";
