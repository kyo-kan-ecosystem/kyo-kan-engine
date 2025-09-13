
/**
 * @typedef {import("./state/states.cjs").States} States
 * 
 * */
/**
 * @typedef {{executorId:any}} ExecutorState
 * @typedef {{name:any}} WorkflowState
 * @typedef  {{workflow:WorkflowState, executor:ExecutorState}} StateType
 */
class Workflows {
    /**
     * 
     * @param {States} states 
     * @param {import("./repositries").ContextRepositries} repositries 
     */
    constructor(states, repositries) {
        /**
         * @type {States}
         */
        this.states = states
        this.repositries = repositries

    }
    getCurrentWorkflow() {
        /**
         * @type {StateType}
         */
        const state = this.states.get()
        const configure = this.repositries.configures.workflows.get(state.workflow.name, state.executor.executorId)

    }



}

module.exports = { Workflows }
