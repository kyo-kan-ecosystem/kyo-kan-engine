const path = require('node:path')
const { DEFAULT_WORKFLOW_REGISTRATION: DEFAULT_WORKFLOW_PLUGINS } = require("../engine/defaults/workflow.cjs")
const { DEFAULT_ENGINE_CONFIGURE } = require("../engine/defaults/configure.cjs")
const deepmerge = require("deepmerge")
const { ContextBuilder } = require("../context/builder.cjs")



/**
 * @typedef {import("../workflow/plugin/protocol.class.cjs").AbstractWorkflow} WorkFlowPluginType
 */

class Registrator extends ContextBuilder {

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
     * @type {Object<any, any>}
     */
    _workflowPlugins
    _defaultWorkflowPlugins
    /**
     * @type {Partial<import("../engine/repositry/protocol.js").EngineConfigure>}
     */
    _engineConfigure



    /**
     *@param {Object} param0 
     *
     *@param {typeof import("../states/protocol.js").Context | null | undefined}[param0.contextClass=null]
     *@param {any}[param0.defaultEngineConfigure=DEFAULT_ENGINE_CONFIGURE]
     *@param {any}[param0.defaultWorkflowPlugins=null]
     */
    constructor({ contextClass = null, defaultWorkflowPlugins = DEFAULT_WORKFLOW_PLUGINS, defaultEngineConfigure = DEFAULT_ENGINE_CONFIGURE } = {}) {
        super(contextClass)
        this._functions = {}
        this._reporter = {}
        this._executorPlugins = {}
        this._engineConfigure = deepmerge({}, defaultEngineConfigure)
        this._workflowPlugins = defaultWorkflowPlugins
        this._defaultWorkflowPlugins = defaultWorkflowPlugins
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
     * @param {Partial<import("../engine/repositry/protocol.js").EngineConfigure>} values 
     */
    registerEngineConfigueres(values) {
        this._engineConfigure = deepmerge(this._engineConfigure || {}, values)

    }
    /**
     * namedWorkflows ライブラリ的に呼び出しできる名前付きライブラリ
     * namedExecutors ライブラリ的に呼び出しできる名前付き実行単位
     * executorPlugins 実行プラグイン本体
     * workflowPlugins ワークフロープラグイン本体
     * @param {import('../../protocol/configure/protocol.d.ts').ConfigureFormat} rootConfigure
     * @param {any} namedWorkflows
     * @param {{ [s: string]: any; } | ArrayLike<any>} namedExecutors
     * @param {any} executorPlugins
     * @param {any} workflowPlugins
     */
    async _convert(rootConfigure, namedWorkflows, namedExecutors, executorPlugins, workflowPlugins) {

        const engineConfigure = this._engineConfigure
        /**
         * @type {import("../workflow/protocol.js").WorkflowContextInit} workflows
         */
        const workflows = { plugins: workflowPlugins, configures: namedWorkflows }

        const executors = { configures: namedExecutors, plugins: executorPlugins }

        const workingContext = this._buildContext({ workflows, executors }, {})

        const rootWorkFlowPluginId = engineConfigure.root?.workflow.plugin
        /**
         * @type {WorkFlowPluginType}
         */
        const rootWorkFlowPlugin = workingContext.workflows.plugins.get(rootWorkFlowPluginId)

        const parsedRootConfigure = rootWorkFlowPlugin.getConfigureParams(rootConfigure)
        workingContext.workflows.addConfigure(rootWorkFlowPluginId, parsedRootConfigure)

        //名前付きプラグインからワークフローの設定を取り出す
        const workflowConfigures = []
        for (const [id, config] of Object.entries(namedExecutors)) {

            const plugin = workingContext.executors.getExecutorPlugin(config.plugin)
            plugin.get()
        }

        // ワークフローのidからワークフローのコンフィグとプラグインを取り出す
        //　ワークフローのプラグインから構成するえくぜきゅーた―の設定を取り出す
        //　えくぜきゅーたを登録し、設定からプラグインを取り出す
        //  えくぜきゅーたのプラグインと設定からサブワークフローを取り出す
        //　サブワークフローを登録
        // 　サブワークフローとえくぜきゅーたのプラグインの対応マップを登録する(じっそうすること)　
        //　最初に戻る
        for (const workflowId of workflowConfigureIds) {

        }


        /**
         * @type {{workflow:string, executorConfig:import("../../protocol/executor/protocol.js").ExecutorConfigure, id:any?}[]}
         */
        const nonNamedExecutorQueue = []

        for (const executorConfig of parsedRootConfigure.executors || []) {

            const item = { workflow: engineConfigure.root?.workflow.id, executorConfig }
            // @ts-ignore
            nonNamedExecutorQueue.push(item)
        }


        let index = 0
        const workerObjects = new Map()

        while (nonNamedExecutorQueue.length > index) {

            const item = nonNamedExecutorQueue[index]
            index += 1
            /**
             * @type {import("../workflow/protocol.js").WorkflowPluginConfigure}
             */
            const workflowConfigure = workingContext.workflows.getConfigure(item.workflow)
            let workerObject = workerObjects.get(item.workflow)

            /**
             * @type {import('../workflow/protocol.js').WorkflowPluginConfigure}
             */
            const workflowPluginConfigure = workingContext.workflows.configures.get(workflowConfigure.plugin)
            const executorId = workingContext.workflows.addConfigure(item.executorConfig)
            workerObject = workflowPluginConfigure.addExecutor(workflowConfigure, executorId, item.executorConfig, workerObject)
            workerObjects.set(item.workflow, workerObject)
            /**
             * @type {import("../../protocol/executor/protocol.d.ts").MaybeWithGetSubworkflow}
             */
            const plugin = workingContext.repositries.plugins.executors.get(item.executorConfig.plugin)

            for (const [name, difinition] of Object.entries(plugin.getSubworkflows(item.executorConfig))) {
                /**
                 * @type {WorkFlowPluginType}
                 */
                const subWorkflowPlugin = workingContext.repositries.plugins.workflows.get(difinition.plugin)
                const configure = item.executorConfig.subworkflows[name]
                const subWorkflowConfigure = subWorkflowPlugin.getConfigureParams(configure, executorId)
                const subwWorkflowId = workingContext.repositries.configures.workflows.add(executorId, name, subWorkflowConfigure.params)


                for (const executor of subWorkflowConfigure.executors || []) {
                    const item = { workflow: subwWorkflowId, executorConfig: executor }
                    nonNamedExecutorQueue.push(item)
                }


            }






        }




    }
    /**
     * 
     * @param {import("../../protocol/executor/protocol.d.ts").MaybeWithGetSubworkflow} plugin 
     * @param {*} configure
     * @param {*} pluginid
     * @param {*} workingContext   
     */
    _getSubWorkflow(plugin, configure, pluginid, workingContext) {
        if ('getSubworkflow' in plugin === false) {
            return false
        }

    }
    _getWorkflowPlugins() {
        return Object.assign({}, this._defaultWorkflowPlugins, this._workflowPlugins)
    }



    getPluginRepositry() {
        return workingContext.repositries.getPluginRepositry()
    }
    getConfiguresAsSerializeDatas() {
        return workingContext.repositries.getConfiguresAsSerializeDatas()
    }



}

module.exports = { Registrator }