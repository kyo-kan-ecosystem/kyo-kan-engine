export type States = import("./state/states.cjs").States;
export type Repositries = any;
export type StateType = import("../../protocol.d.ts").StateType;
export type Workflow = import("../../../workflow/plugin/interface.cjs").Workflow;
export type WorkflowsInit = {
    states: States;
    repositries: Repositries;
};
export type WorkflowState = import("../../protocol.d.ts").WorkflowState;
/**
 * @typedef {import("./state/states.cjs").States} States
 * @typedef {import("./repositries").Repositries} Repositries
 *
 * */
/**
 * @typedef {import("../../protocol.d.ts").StateType} StateType
 * @typedef {import("../../../workflow/plugin/interface.cjs").Workflow} Workflow
 * @typedef {{states:States,repositries:Repositries}} WorkflowsInit
 * @typedef {import("../../protocol.d.ts").WorkflowState} WorkflowState
 */
export class Workflows {
    /**
     *
     * @param {WorkflowsInit} initData
     */
    constructor(initData: WorkflowsInit);
    /**
     * @type {States}
     */
    states: States;
    /**
     * @type {Repositries}
     */
    repositries: Repositries;
    getCurrentWorkflow(): any;
    /**
     * @returns {Workflow}
     */
    goSub(): Workflow;
}
