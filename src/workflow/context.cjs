




class WorkflowsContext {
    /**
     * @type {import('../context/states/states.cjs').StatesType}
     */
    states

    /**
     * @type {import("../context/repositries.cjs").Repositries}
     */

    repositries
    /**
     * @type {any}
     */
    context
    /**
     * 
     * @param {{states:import("../context/states/states.cjs").StatesType, repositries:import("../context/repositries.cjs").Repositries, context:any}} initData 
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
        const state = this.states.now.get()
        return this._getWorkflow(state.workflow?.id)
    }
    /**
     * @param {any} id
     */
    _getWorkflow(id) {
        /**
         * @type { import("./protocol").WorkflowPluginConfigure}
         */

        const configure = this.repositries.configures.workflows.get(id)
        /**
         * @type {import("./protocol").WorkflowPlugin}
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

        const workflowId = this.repositries.configures.engine.get().root.workflow.id
        const { workflow, configure } = this._getWorkflow(workflowId)
        this.states.now.update({ 'workflow': { id: workflowId } })
        return workflow.enterWorkflow(this.context, configure)








    }


    goSub() {
        const { configure: currentConfigure } = this.getCurrentWorkflow()

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
        const { workflow, configure } = this.getCurrentWorkflow()
        workflow.exitFromSubworkflow(context, request, configure)
        const { workflow: superWorkflow, configure: superConfigure } = this.getCurrentWorkflow()

        return superWorkflow.returnFromSubworkflow(context, request, superConfigure)

    }



}

module.exports = { WorkflowsContext }
