

const { ContextBuilder } = require("../../context/builder.cjs")



/**
 * @typedef {import("../../workflow/plugin/protocol.class.cjs").AbstractWorkflow} WorkFlowPluginType
 */

class Registrater extends ContextBuilder {
    /**
     * @type {import("../../context/index.cjs").Context<any, any>}
     */
    context
    /**
     * 
     * @param {import("../../context/protocol").ContextSerializableData} datas
     * @param {import("../../context/protocol").ContextApi} api       *
     * @param {typeof import("../../context/index.cjs").Context?} contextClass  
     */
    constructor(datas, api, contextClass) {
        super(contextClass)
        this.context = this._buildContext(datas, api)


    }
    /**
     * 
     * @param {*} pluginName 
     * @param {*} plugin 
     */
    registerExecutorPlugin(pluginName, plugin) {
        this.context.repositries.plugins.executors.set(pluginName, plugin)
    }
    /**
     * 
     * @param {*} pluginName 
     * @param {*} plugin 
     */
    registerWorkflowPlugin(pluginName, plugin) {
        this.context.repositries.plugins.workflows.set(pluginName, plugin)
    }
    /**
     * 
     * @param {import("../../engine/repositry/configure.cjs")} values 
     */
    setEngineConfigue(values) {
        this.context.repositries.configures.engine.set(values)

    }
    /**
     * 
     * @param {any} configure 
     */
    parseConfigure(configure) {

        const engineConfigure = this.context.repositries.configures.engine.get()
        /**
         * @type {WorkFlowPluginType}
         */
        const rootWorkFlowPlugin = this.context.repositries.plugins.workflows.get(engineConfigure.root.workflow.plugin)
        const rootWorkFlowPluginId = engineConfigure.root.workflow.id
        const rootConfigure = rootWorkFlowPlugin.getConfigureParams(configure)
        this.context.repositries.configures.workflows.set(rootWorkFlowPluginId, rootConfigure)
        /**
         * @type {{workflow:string, executorConfig:import("../../../protocol/executor/protocol").ExecutorConfigure}[]}
         */
        const executorQueue = []

        for (const executorConfig of rootConfigure.executors || []) {

            const item = { workflow: engineConfigure.root.workflow.id, executorConfig }
            executorQueue.push(item)
        }


        let index = 0
        const workerObjects = new Map()

        while (executorQueue.length > index) {

            const item = executorQueue[index]
            index += 1
            /**
             * @type {import("../../workflow/protocol").WorkflowPluginConfigure}
             */
            const workflowConfigure = this.context.repositries.configures.workflows.get(item.workflow)
            let workerObject = workerObjects.get(item.workflow)

            /**
             * @type {WorkFlowPluginType}
             */
            const workflowPlugin = this.context.repositries.plugins.workflows.get(workflowConfigure.plugin)
            const executorId = this.context.repositries.configures.executors.add(item.executorConfig)
            workerObject = workflowPlugin.addExecutor(workflowConfigure, executorId, item.executorConfig, workerObject)
            workerObjects.set(item.workflow, workerObject)
            /**
             * @type {import("../../../protocol/executor/baic_class.cjs").AbstractExecutorPlugin}
             */
            const plugin = this.context.repositries.plugins.executors.get(item.executorConfig.plugin)
            if () { }
            for (const [name, difinition] of Object.entries(plugin.getSubworkflows(item.executorConfig))) {
                /**
                 * @type {WorkFlowPluginType}
                 */
                const subWorkflowPlugin = this.context.repositries.plugins.workflows.get(difinition.plugin)
                const configure = item.executorConfig.subworkflows[name]
                const subWorkflowConfigure = subWorkflowPlugin.getConfigureParams(configure, executorId)
                const subwWorkflowId = this.context.repositries.configures.workflows.add(executorId, name, subWorkflowConfigure.params)


                for (const executor of subWorkflowConfigure.executors || []) {
                    const item = { workflow: subwWorkflowId, executorConfig: executor }
                    executorQueue.push(item)
                }


            }






        }




    }
    getPluginRepositry() {
        return this.context.repositries.getPluginRepositry()
    }
    getConfiguresAsSerializeDatas() {
        return this.context.repositries.getConfiguresAsSerializeDatas()
    }



}

module.exports = { Registrater }