
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
class Workflows {
    /**
     * 
     * @param {WorkflowsInit} initData 
     */
    constructor(initData) {
        /**
         * @type {States}
         */
        this.states = initData.states
        /**
         * @type {Repositries}
         */
        this.repositries = initData.repositries

    }
    getCurrentWorkflow() {
        /**
         * @type {StateType}
         */
        const state = this.states.get()
        const configure = this.repositries.configures.workflows.get(state.workflow.name, state.executor.executorId)

    }
    /**
     * @returns {Workflow}
     */
    goSub() {
        /**
         * @type {StateType}
        */
        const superState = this.states.get(1)
        /**
         * @type {WorkflowState}
         */
        const subWorkflowState = Object.assign({}, superState.workflow.subwWorkflow)
        subWorkflowState.id = this.repositries.configures.workflows.getId(subWorkflowState.name, superState.executor.executorId)


        /**
         * @type {Partial<StateType>}
         */
        const updateState = { workflow: subWorkflowState }
        this.states.update(updateState)



    }



}

module.exports = { Workflows }
