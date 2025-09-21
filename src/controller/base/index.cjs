

const { Context } = require("./context/index.cjs")
/**
 * @typedef {import("../../workflow/plugin/base_class.cjs").BaseWorkflow} WorkFlowPluginType
 */

/**
 * @typedef {import("../../workflow/protocol.d.ts").WorkflowPluginConfigure} WorkflowPluginConfigure
 */
/**
 * @typedef {import("./context/index.cjs").ContextInit} ContextInit
 */
class ContextBuilder {

    /**
     * @type {typeof Context}
     */
    _contextClass

    /**
     * 
     * @param {typeof Context?} contextClass 
     */
    constructor(contextClass) {
        this._contextClass = contextClass || Context
    }
    /**
     * @param {ContextInit} args 
     * @returns {Context}
     */
    _buildContext(contextInit) {
        return new this._contextClass(contextInit)
    }

}
class Registrater extends ContextBuilder {
    /**
     * @type {Context}
     */
    context
    /**
     * 
     * @param {ContextInit?} contextInit 
     * @param {typeof Context?} contextClass 
     */
    constructor(contextInit, contextClass) {
        super(contextClass)
        this.context = this._buildContext(contextInit)


    }
    registerExecutorPlugin(pluginName, plugin) {
        this.context.repositries.plugins.executors.set(pluginName, plugin)
    }
    registerWorkflowPlugin(pluginName, plugin) {
        this.context.repositries.plugins.workflows.set(pluginName, plugin)
    }
    /**
     * 
     * @param {import("../../engine/repositry/configure.cjs").EngineConfigure} values 
     */
    setEngineConfigue(values) {
        this.context.repositries.configures.engine.update(values)

    }
    parseConfigure(configure) {
        /**
         * @type {import("../../engine/repositry/configure.cjs").EngineConfigure}
         */
        const engineConfigure = this.context.repositries.configures.engine.get()
        /**
         * @type {WorkFlowPluginType}
         */
        const rootWorkFlowPlugin = this.context.repositries.plugins.workflows.get(engineConfigure.root.workflow.plugin)
        const rootConfigure = rootWorkFlowPlugin.getConfigureParams(configure)
        this.context.repositries.configures.workflows.set(engineConfigure.root.workflow.id, rootConfigure.params)
        const executorQueue = []
        for (const executorConfig of rootConfigure.executors || []) {
            const item = { workflow: engineConfigure.root.workflow.id, executorConfig }
            executorQueue.push(item)
        }



        while (executorQueue.length > 0) {

            const item = executorQueue.shift()
            /**
             * @type {WorkflowPluginConfigure}
             */
            const workflowConfigure = this.context.repositries.configures.workflows.get(item.workflow)
            /**
             * @type {WorkFlowPluginType}
             */
            const workflowPlugin = this.context.repositries.plugins.workflows.get(workflowConfigure.plugin)
            const executorId = this.context.repositries.configures.executors.add(item.executorConfig)
            workflowPlugin.addExecutor(workflowConfigure, executorId)
            for (const [name, configure] of Object.entries(item.executor.workflows || {})) {
                /**
                 * @type {WorkFlowPluginType}
                 */
                const subWorkflowPlugin = this.context.repositries.plugins.workflows.get(configure.plugin)
                const subWorkflowConfigure = subWorkflowPlugin.getConfigureParams(configure.params, executorId)
                const subwWorkflowId = this.context.repositries.configures.workflows.add(executorId, name, subWorkflowConfigure.params)


                for (const executor of subWorkflowConfigure.executors || []) {
                    const item = { workflow: subwWorkflowId, executor }
                    executorQueue.push(item)
                }


            }






        }




    }



}

class Controller {
    /**
     * 
     * @param {{executer?:any, workflow:any}} repositryData 
     * @param {type Repositry} workflowRepositryClass 
     * @param {type Repositry} pluginRepositryClass 
     
     */
    constructor(repositryData, workflowRepositryClass = Repositry, executerRepositryClass = Repositry) {
        /**
         * @type {RepositryContext}
         */
        this.workflowRepositryContext = new workflowRepositryClass(repositryData.workflow)
        this.executerRepositryContext = new executerRepositryClass(repositryData.executer)

    }
    registerWorkflow(id, worklow) {
        this.workflowRepositryContext.set(id, worklow)

    }
    registerExecuter(id, executer) {
        this.executerRepositryContext.set(id, executer)
    }


    /**
     * 
     * @param {any} request 
     * @param {ControllerContext} context 
     */
    exec(request, context) {


    }
}

module.exports = { Registrater, Controller, ContextBuilder }