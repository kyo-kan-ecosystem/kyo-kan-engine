


const deepmerge = require("deepmerge")
const { Context } = require("../../src/context/index.cjs")
const { DEFAULT_ENGINE_CONFIGURE } = require("../../src/engine/defaults/configure.cjs")
const { deepcopy } = require("../../src/util/deepcopy.cjs")
const { CountId } = require("../../src/util/count_id.cjs")
const { ResolverParseContext } = require("../../src/resolver/interfacade/parse_context.cjs")






class Registrator {

    /**
     * @type {typeof Context}
     */
    _contextClass


    /**
     * @param {import("../../src/context/protocol").ContextSerializableData} datas
     * @returns
     */
    _buildResolver(datas, api) {
        // @ts-ignore
        const context = new this._contextClass({ datas: datas, api: api })
        return new ResolverParseContext(context)
    }
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
     * @type {Object<string, import('../workflow/protocol.js').WorkflowPluginConfigure >}
     */
    _workflowPlugins
    _defaultWorkflowPlugins
    /**
     * @type {Partial<import("../engine/repositry/protocol.js").EngineConfigure>}
     */
    _engineConfigure

    /**
     * @type {Partial<import('../workflow/protocol.js').WorkflowPluginConfigure>}
     */
    _rootWorkflow


    /**
     *@param {Object} param0 
     *@param {Context?} [param0.contextClass=Context]
     *@param {any}[param0.defaultEngineConfigure=DEFAULT_ENGINE_CONFIGURE]
     *@param {any}[param0.defaultWorkflowPlugins=null]
     */
    constructor({ contextClass = Context, defaultWorkflowPlugins, defaultEngineConfigure = DEFAULT_ENGINE_CONFIGURE } = {}) {
        super(contextClass)
        this._functions = {}
        this._reporter = {}
        this._executorPlugins = {}
        this._engineConfigure = deepmerge({}, defaultEngineConfigure)
        this._workflowPlugins = defaultWorkflowPlugins
        this._defaultWorkflowPlugins = defaultWorkflowPlugins

    }
    /**
     * @param {Object} param0 
     * @param {string} param0.pluginName 
     * @param {*} param0.params 
     */
    registerRootWorkflow({ pluginName, params }) {
        this._rootWorkflow = { pluginName, params }

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
     * @param {string} plugin
     * @param {*} data
     */
    registerWorkflowPlugin(pluginName, plugin, data) {


        this._workflowPlugins[pluginName] = { plugin, data }
    }



    /**
     * 
     * @param {Partial<import("../engine/repositry/protocol.js").EngineConfigure>} values 
     */
    registerEngineConfigueres(values) {
        this._engineConfigure = deepmerge(this._engineConfigure || {}, values)

    }
    /**
     * todo: bootを追加
     * namedWorkflows ライブラリ的に呼び出しできる名前付きライブラリ
     * namedExecutors ライブラリ的に呼び出しできる名前付き実行単位
     * executorPlugins 実行プラグイン本体
     * workflowPlugins ワークフロープラグイン本体
     * @param {import("../../src/workflow/protocol").RootWorkflowConfigure} rootWorkflowConfigure
     * @param {{[k in string]:import("../../src/workflow/protocol").WorkflowPluginConfigureReadable}} namedWorkflows
     * @param {{ [s in string]: import("../../src/executor/protocol").ExecutorConfigureReadable }} namedExecutorConfigures
     * @param { import("../../src/executor/protocol").ExecutorConfigureReadable[]} bootExecutors
     * @param {*} engineConfigure  
     * @param {any} executorPlugins
     * @param {any} workflowPlugins
     * 
     */
    async _parse(rootWorkflowConfigure, namedWorkflows, namedExecutorConfigures, executorPlugins, workflowPlugins, engineConfigure, bootExecutors) {


        /**
         * @type {import("../../src/workflow/protocol").WorkflowContextInit}
         */
        const workflows = { plugins: workflowPlugins }
        /**
         * @type {import("../../src/executor/protocol").ExecutorsContextInit}
         */
        const executors = { plugins: executorPlugins }
        const engine = { configureInit: engineConfigure }

        const workingResolver = this._buildResolver({ workflows, executors, engine }, {})

        const rootWorkFlowPluginId = workingResolver.context.engine.configure.get().root.workflow.id
        const rootWorkflowPlugin = workingResolver.context.engine.configure.get().root.workflow.plugin








        /**
         * @type {{id:any, configurePath:import("../configure/protocol").ConfigurePath, configure:import("../../src/workflow/protocol").WorkflowPluginConfigureReadable, executorConfigureId?:any}[]}
         */
        let workflowDatas = [{ id: rootWorkFlowPluginId, configurePath: { root: 'root', expressions: [] }, configure: Object.assign({ plugin: rootWorkflowPlugin }, rootWorkflowConfigure) }]
        let workflowIndex = 0

        for (const [id, configure] of Object.entries(namedWorkflows)) {
            workflowDatas.push({ id, configurePath: { root: 'workflow', expressions: [id] }, configure })

        }


        /**
         * @type {{id:any, configurePath:import("../configure/protocol").ConfigurePath,  configure:any}[]}
         */
        let executorDatas = []
        let executorIndex = 0

        for (const [id, configure] of Object.entries(namedExecutorConfigures)) {
            executorDatas.push({ id, configurePath: { root: 'executor', expressions: [id] }, configure })

        }

        let bootIndex = 0
        for (const configure of bootExecutors) {


            const { isIdExist, id } = workingResolver.filterAndGetExcutorId(configure)
            if (isIdExist === false) {
                executorDatas.push({ id, configurePath: { root: 'boot', expressions: [bootIndex] }, configure })
            }




            workingResolver.executors.bootConfigures.add(id)
            bootIndex++

        }




        while (workflowDatas.length > workflowIndex || executorDatas.length > executorIndex) {


            while (workflowDatas.length > workflowIndex) {

                const workflowData = workflowDatas[workflowIndex]
                workflowIndex++
                const workflowPlugin = workingResolver.context.workflows.getPlugin(workflowData.configure)



                const { memberExecutors, executorIDs } = workflowPlugin.getMemberExecutors(workflowData.configure)
                for (const memberExecutor of memberExecutors) {



                    const configurePath = deepcopy(workflowData.configurePath)

                    configurePath.expressions = workflowData.configurePath.configurePath.expressions.concat(memberExecutor.configurePath)
                    executorDatas.push({ id: memberExecutor.id, configurePath, configure: memberExecutor.executorConfig })

                }
                workingResolver.context.workflows.addConfigure(
                    workflowData.id,
                    {
                        configurePath: workflowData.configurePath,
                        executorIDs,
                        options: workflowData.configure.options,
                        plugin: workflowData.configure.plugin
                    }
                )

            }
            while (executorDatas.length > executorIndex) {
                const executorData = executorDatas[executorIndex]
                executorIndex++
                const plugin = workingResolver.executors.getExecutorPlugin(executorData.configure.plugin)
                const workflowConfigureMap = this._getSubWorkflow(plugin, config, executorData.id, workingResolver)
                if (workflowConfigureMap == false) {
                    continue
                }
                // 次ここから

            }
        }













    }
    /**
     * 
     * @param {import("../../protocol/executor/protocol.d.ts").MaybeWithGetSubworkflow} plugin 
     * @param {*} configure
     * @param {*} pluginid
     * @param {InstanceType<ContextType>} workingContext   
     */
    _getSubWorkflow(plugin, configure, pluginid, workingContext) {
        if ('getSubworkflow' in plugin === false) {
            return false
        }

        // @ts-ignore
        return plugin.getSubworkflow(configure)





    }








}

module.exports = { Registrator }