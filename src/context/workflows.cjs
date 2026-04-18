
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
     * @param {{states:import("./states/states.cjs").StatesType, repositries:import("./repositries.cjs").Repositries, context:any}} initData 
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
        return this._getWorkflow(state.workflow?.id)
    }
    /**
     * @param {any} id
     */
    _getWorkflow(id) {
        /**
         * @type { import("../workflow/protocol").WorkflowPluginConfigure}
         */

        const configure = this.repositries.configures.workflows.get(id)
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


        const state = this.states.get()
        const { workflow, configure } = this._getWorkflow(state.controlls?.subworkflowId)
        return { workflowSteps: workflow.enterWorkflow(this.context, configure), workflowId: state.controlls?.subworkflowId }








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
