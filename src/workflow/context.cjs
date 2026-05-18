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
     * @param {import("../states/protocol").StateType} state
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
     * @param {import("../states/protocol").StateType} state
     * @param {import("../context/index.cjs").Context<any, any>} request
     * */
    go(context, state, request) {

        const { workflow, configure } = this.getWorkflow(state)
        return workflow.go(context, configure, request)

    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
     */
    now(context, state, request) {
        const { workflow, configure } = this.getWorkflow(state)
        return workflow.now(context, configure, request)
    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
     */
    start(context, state, request) {


        const { workflow, configure } = this.getWorkflow(state)


        return workflow.enterWorkflow(context, configure, request)








    }

    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
    */
    goSub(context, state, request) {



        const { workflow, configure } = this.getWorkflow(state)



        return workflow.enterAsSubworkflow(context, configure, request)












    }
    /**
     * @param {*} context
     * @param {*} request
     * @returns {import("./plugin/protocol").MaybeWorkflowSteps}
     * @param {import("../states/protocol").StateType} subworkflowState
     * @param {import("../states/protocol").StateType} workflowState
     */
    returnFromSub(subworkflowState, workflowState, context, request) {
        const { workflow, configure } = this.getWorkflow(subworkflowState)
        workflow.exitFromSubworkflow(context, request, configure)
        const { workflow: superWorkflow, configure: superConfigure } = this.getWorkflow(workflowState)

        return superWorkflow.returnFromSubworkflow(context, request, superConfigure)

    }



}

module.exports = { WorkflowsContext }
