
const { ContextBuilder } = require("./context_builder.cjs")

/**
 * @typedef {import("./context/index.cjs").ContextInit} ContextInit
 */
/**
 * @typedef {import("./context/index.cjs").Context} Context
 */
/**
 * @typedef {import("../../workflow/plugin/base_class.cjs").BaseWorkflow} WorkFlowPluginType
 */

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
        /**
         * @type {{workflow:string, executorConfig:import("../../../protocol/plugin.protocol").PluginConfigure}[]}
         */
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
            /**
             * @type {import("../../../protocol/plugin.protocol.classes.cjs").PluginBaseClass}
             */
            const plugin = this.context.repositries.plugins.executors.get(item.executorConfig.plugin)

            for (const [name, difinition] of Object.entries(plugin.getSubworkflows())) {
                /**
                 * @type {WorkFlowPluginType}
                 */
                const subWorkflowPlugin = this.context.repositries.plugins.workflows.get(difinition.plugin)
                const configure = item.executorConfig.subworkflows[name]
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

module.exports = { Registrater }