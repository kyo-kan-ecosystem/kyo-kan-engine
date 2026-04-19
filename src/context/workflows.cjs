
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
        if (this.states.isStart() === true) {
            const defaultWorkflow = this.repositries.configures.engine.get().root.workflow.id
            return this._getWorkflow(defaultWorkflow)
        }

        /**
         * @type {import("../controller/protocol").StateType}
         */
        const state = this.states.now.get()
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
    start() {

    }



    goSub() {


        const state = this.states.now.get()
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
