const { Repositries } = require("./repositries.cjs")



class Workflows {
    /**
     * @type {import('./states/states.cjs').States}
     */
    states

    /**
     * @type {import("./repositries.cjs").Repositries}
     */

    repositries
    /**
     * 
     * @param {{states:import("./states/states.cjs").States, repositries:import("./repositries.cjs").Repositries}} initData 
     */
    constructor(initData) {
        this.repositries = initData.repositries
        this.states = initData.states



    }
    getCurrentWorkflow() {
        /**
         * @type {import("../../protocol").StateType}
         */
        const state = this.states.get()
        /**
         * @type { import("../../../workflow/protocol").WorkflowPluginConfigure}
         */

        const configure = this.repositries.configures.workflows.get(state.workflow.id)
        return this.repositries.plugins.workflows.get(configure.plugin)


    }

    goSub() {
        /**
         * @type {import("../../protocol").StateType}
        */
        const superState = this.states.get(1)
        const id = this.repositries.configures.workflows.getId(superState.workflow.subwWorkflow.name, superState.executor.executorId)

        const subWorkflowState = Object.assign({ id }, superState.workflow.subwWorkflow)



        /**
         * @type {Partial<StateType>}
         */
        const updateState = { workflow: subWorkflowState }
        this.states.update(updateState)



    }



}

module.exports = { Workflows }
