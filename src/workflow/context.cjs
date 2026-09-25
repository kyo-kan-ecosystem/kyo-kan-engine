const { assertIsNotVoid } = require("../util/is_void.cjs")
const { IdIsVoidError } = require("./errors.cjs")

const { WorkflowConfiguresRepositry } = require("./repositry/configures.cjs")

const { WorkflowPluginRepositry } = require("./repositry/plugins.cjs")




/**
 * @templte StateType
 * @templte InitDataType
 */
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
     * @param {import("./protocol").WorkflowStateMember} state
    */
    getWorkflowFromState(state) {
        const id = state.workflow?.id
        return this.getConfigureAndPlugin(id)

    }

    /**
     * @param {any?} id
     */
    getConfigureAndPlugin(id) {

        assertIsNotVoid(id, IdIsVoidError)

        const configure = this.configures.get(id)
        const workflow = this.plugins.get(configure.plugin)

        return { workflow, configure }


    }
    /**
     * @param {{plugin:any}} configure
     */
    getPluginFromConfigure(configure) {
        return this.plugins.get(configure.plugin)
    }

    /**
     * 
     * @param {any} context
     * @param {import("../states/protocol").StateType} state
     * @param {import("../context/index.cjs").Context<any, any>} request
     * */
    go(context, state, request) {

        const { workflow, configure } = this.getWorkflowFromState(state)
        return workflow.go(context, configure, request)

    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
     */
    now(context, state, request) {
        const { workflow, configure } = this.getWorkflowFromState(state)
        return workflow.now(context, configure, request)
    }
    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
     */
    start(context, state, request) {


        const { workflow, configure } = this.getWorkflowFromState(state)


        return workflow.enterWorkflow(context, configure, request)








    }

    /**
     * 
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @param {import("../states/protocol").StateType} state
     * @param {undefined} request
    */
    goSub(context, state, request) {



        const { workflow, configure } = this.getWorkflowFromState(state)



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
        const { workflow, configure } = this.getWorkflowFromState(subworkflowState)
        workflow.exitFromSubworkflow(context, request, configure)
        const { workflow: superWorkflow, configure: superConfigure } = this.getWorkflowFromState(workflowState)

        return superWorkflow.returnFromSubworkflow(context, request, superConfigure)

    }
    /**
     * shorthand facade for configure set
     * @param {*} id
     * @param {import("./protocol").WorkflowConfigure} configure
     */
    addConfigure(id, configure) {

        this.configures.set(id, configure)

    }
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    getConfigure(id) {
        return this.configures.get(id)
    }




}

module.exports = { WorkflowsContext }
