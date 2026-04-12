
const { Repositries } = require("./repositries.cjs")



class Workflows {
    /**
     * @type {import('./states/states.cjs').StatesType}
     */
    states

    /**
     * @type {import("./repositries.cjs").Repositries}
     */

    repositries
    /**
     * @type {any}
     */
    context
    /**
     * 
     * @param {{states:import("./states/states.cjs").States, repositries:import("./repositries.cjs").Repositries, context:any}} initData 
     */
    constructor(initData) {
        this.repositries = initData.repositries
        this.states = initData.states
        this.context = initData.context



    }

    getCurrentWorkflow() {
        /**
         * @type {import("../controller/protocol").StateType}
         */
        const state = this.states.get()
        /**
         * @type { import("../workflow/protocol").WorkflowPluginConfigure}
         */

        const configure = this.repositries.configures.workflows.get(state.workflow?.id)
        /**
         * @type {import("../workflow/protocol").Plugin}
         */
        const workflow = this.repositries.plugins.workflows.get(configure.plugin)

        return { workflow, configure }


    }

    go() {

        const { workflow, configure } = this.getCurrentWorkflow()
        return workflow.go(this.context, configure)

    }
    now() {
        const { workflow, configure } = this.getCurrentWorkflow()
        return workflow.now(this.context, configure)
    }



    goSub() {
        /**
         * @type {import("../controller/protocol").StateType}
        */
        const superState = this.states.get(1)
        const id = this.repositries.configures.workflows.getId(superState.workflow.subwWorkflow.name, superState.executor.executorId)

        const currentWorkflowState = Object.assign({ id }, superState.workflow.subwWorkflow)



        /**
         * @type {import("../controller/protocol").StateType}
         */
        const updateState = { workflow: currentWorkflowState }
        this.states.update(updateState)



    }
    /**
     * 
     * @param {*} context
     * @param {*} request 
     * @returns {{state:any, response:any[]}} 
     */
    returnFromSubworkflow(context, request) {
        const { plugin, configure } = this.getCurrentWorkflow()
        return plugin.returnFromSubworkflow(context, request, configure)
    }



}

module.exports = { Workflows }
