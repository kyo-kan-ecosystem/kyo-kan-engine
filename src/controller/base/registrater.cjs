import { DEFAULT_WORKFLOW_REGISTRATION } from "../../engine/defaults/workflow.cjs"

const { DEFAULT_ENGINE_CONFIGURE } = require("../../engine/defaults/configure.cjs")

const deepmerge = require("deepmerge")



const { ContextBuilder } = require("../../context/builder.cjs")



/**
 * @typedef {import("../../workflow/plugin/protocol.class.cjs").AbstractWorkflow} WorkFlowPluginType
 */

class Registrater extends ContextBuilder {

    /**
     * @type {Object<any, any>?}
     */
    _functions

    /**
     * @type {Object<any, any>?}
     * 
     * 
     */
    _reporter

    /**
     * @type {Object<any, any>}
     */
    _executorPlugins


    /**
     * @type {Object<any, any>?}
     */
    _workflowPlugins

    /**
     * @type {Partial<import("../../engine/repositry/protocol.d.ts").EngineConfigure>?}
     */
    _engineConfigure



    /**
     *@param {Object} param0 
     *
     *@param {typeof import("../protocol.js").Context | null | undefined}[param0.contextClass=null]
     *@param {any}[param0.defaultWorkflowPlugins=null]
     */
    constructor({ contextClass = null, defaultWorkflowPlugins = DEFAULT_WORKFLOW_REGISTRATION } = {}) {
        super(contextClass)
        this._functions = {}
        this._reporter = {}
        this._executorPlugins = {}
        this._engineConfigure = {}
        this._workflowPlugins = Object.assign({}, defaultWorkflowPlugins)
    }


    /**
     * 
     * @param {*} pluginName 
     * @param {*} plugin 
     */
    registerExecutorPlugin(pluginName, plugin) {
        this._executorPlugins[pluginName] = plugin
    }

    /**
     * @param {string | number} pluginName
     * @param {any} plugin
     */
    registerWorkflowPlugin(pluginName, plugin) {

        this._workflowPlugins[pluginName] = plugin
    }



    /**
     * 
     * @param {Partial<import("../../engine/repositry/protocol.d.ts").EngineConfigure>} values 
     */
    registerEngineConfigueres(values) {
        this._engineConfigure = deepmerge(this._engineConfigure || {}, values)

    }
    /**
     * 
     * @param {any} configure 
     */
    parseConfigure(configure) {

        const engineConfigure = deepmerge(DEFAULT_ENGINE_CONFIGURE, this._engineConfigure || {})
        const context = this._buildContext()
        const rootWorkFlowPluginId = engineConfigure.root.workflow.id

        /**
         * @type {WorkFlowPluginType}
         */
        const rootWorkFlowPlugin = this.context.repositries.plugins.workflows.get(rootWorkFlowPluginId)

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