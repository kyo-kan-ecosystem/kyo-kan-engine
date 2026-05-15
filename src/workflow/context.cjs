const { IdIsVoidError } = require("./errors.cjs")

const { WorkflowConfiguresRepositry } = require("./repositry/configures.cjs")

const { WorkflowPluginRepositry } = require("./repositry/plugins.cjs")





class WorkflowsContext {

    /**
     * @type {WorkflowPluginRepositry}
     */
    plugins
    /**
     * @type {WorkflowConfiguresRepositry} 
     */
    configures
    /**
     * 
     * @param {import("./protocol").WorkflowContextInit} param0 
     * 
     */
    constructor({ plugins = null, configures = null, pluginsClass = WorkflowPluginRepositry, configuresClass = WorkflowConfiguresRepositry } = {}) {
        this.plugins = new pluginsClass(plugins)
        this.configures = new configuresClass(configures)





    }

    /**
     * @param {import("../controller/protocol").StateType} state
    */
    getWorkflow(state) {




        const id = state.workflow?.id
        if (id === null || typeof id === 'undefined') {
            throw new IdIsVoidError(id)


        }

        /**
         * @type { import("./protocol").WorkflowPluginConfigure}
         */

        const configure = this.configures.get(id)
        /**
         * @type {import("./protocol").WorkflowPlugin}
         */
        const workflow = this.plugins.get(configure.plugin)

        return { workflow, configure }


    }

    /**
     * 
     * @param {any} context
     * @param {import("../controller/protocol").StateType} state
     * @param {import("../context/index.cjs").Context<any, any>} request
     * */
    go(context, state, request) {

        const { workflow, configure } = this.getWorkflow(state)
        return workflow.go(context, configure, request)

    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../controller/protocol").StateType} state
     * @param {undefined} request
     */
    now(context, state, request) {
        const { workflow, configure } = this.getWorkflow(state)
        return workflow.now(context, configure, request)
    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../controller/protocol").StateType} state
     * @param {undefined} request
     */
    start(context, state, request) {


        const { workflow, configure } = this.getWorkflow(state)


        return workflow.enterWorkflow(context, configure, request)








    }


    goSub() {
        const { configure: currentConfigure } = this.getWorkflow()

        const subworkflowId = this.states.controll.getSubworkflowId()
        const { workflow, configure } = this._getWorkflow(subworkflowId)



        return {
            workflowSteps: workflow.enterAsSubworkflow(this.context, configure),
            workflowId: this.states.now.get()?.workflow?.id
        }










    }
    /**
     * 
     * @param {*} context
     * @param {*} request 
     * @returns {import("./plugin/protocol").MaybeWorkflowSteps} 
     */
    returnFromSub(context, request) {
        const { workflow, configure } = this.getWorkflow()
        workflow.exitFromSubworkflow(context, request, configure)
        const { workflow: superWorkflow, configure: superConfigure } = this.getWorkflow()

        return superWorkflow.returnFromSubworkflow(context, request, superConfigure)

    }



}

module.exports = { WorkflowsContext }
