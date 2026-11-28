const { extendScenarioPath, createWorkflowScenarioPath, createExecutorScenarioPath, createBootScenarioPath, createRootScenarioPath } = require('../../../interfacade/scenario_path/scenario_path.cjs')
const { CountId } = require('../../util/count_id.cjs')
const { Context } = require('../../context/class.cjs')


/**
 * @typedef {{id:any, configure:any, scenarioPath:import('../../../interfacade/scenario_path/protocol').ScenarioPath}} ConfigureData
 * @typedef {ConfigureData[]} ConfigureDatas
 */
class ResolverParseContext {

    context
    /**
     * @type {CountId}
     */
    executorCountId


    /**
     * @type {ConfigureDatas}
     */
    executorDatas


    /**
     * @type {CountId}
     */
    workflowCountId



    /**
     * @type {ConfigureDatas}
    */
    workflowDatas

    /**
     * @type {import('../../../interfacade/scenario_path/protocol').ScenarioPath?}
     */
    parentScenarioPath
    /**
     * 
     * @param {Context} context 
     */
    constructor(context) {
        this.context = context

        this.executorCountId = new CountId()
        this.workflowCountId = new CountId()

        this.executorDataIndex = 0
        this.workflowDataIndex = 0

        this.executorDatas = []
        this.workflowDatas = []
        this.parentScenarioPath = null



    }
    /**
     * 
     * @param {import('../../workflow/protocol').WorkflowPluginConfigureReadable} configure
     * @param {any[]} scenarioPathExpression
     *  
     * 
     * 
     */
    pushWorkflowdata(configure, scenarioPathExpression) {



        const { isLink, id } = this.filterAndGetWorkflowId(configure)
        if (isLink === false) {
            // @ts-ignore
            const scenarioPath = extendScenarioPath(this.parentScenarioPath, scenarioPathExpression)

            // @ts-ignore
            this.workflowDatas.push({ id, configure, scenarioPath })


        }
        return id





    }
    /**
     * @param {any} id
     * @param {any} configure
     */
    pushNamedWorkflow(id, configure) {
        const scenarioPath = createWorkflowScenarioPath()
        scenarioPath.expressions.push(id)
        this.workflowDatas.push({ id, configure, scenarioPath })


    }
    /**
     * 
     * @param {import('../../workflow/protocol').WorkflowPluginConfigureReadable} configure
     * @param {any[]} scenarioPathExpression
     *  
     * 
     * 
     */
    pushExecutordata(configure, scenarioPathExpression) {



        const { isLink, id } = this.filterAndGetExcutorId(configure)
        if (isLink === false) {
            // @ts-ignore
            const scenarioPath = extendScenarioPath(this.parentScenarioPath, scenarioPathExpression)


            this.workflowDatas.push({ id, configure, scenarioPath })


        }
        return id





    }
    /**
     * @param {any} id
     * @param {any} configure
     */
    pushNamedExecutor(id, configure) {
        const scenarioPath = createExecutorScenarioPath()
        scenarioPath.expressions.push(id)
        this.executorDatas.push({ id, configure, scenarioPath })


    }
    /**
     * 
     * @param {Array<any>} configures 
     */
    pushBootExecutors(configures) {
        let index = 0
        while (configures.length > index) {
            const configure = configures[index]
            index++
            const { isLink, id } = this.filterAndGetExcutorId(configure)
            this.context.executors.bootConfigures.add(id)
            if (isLink === true) {
                continue
            }
            const scenarioPath = createBootScenarioPath()
            scenarioPath.expressions.push(id)
            this.executorDatas.push({ id, configure, scenarioPath })
        }


    }
    /**
     * 
     * @param {*} rootConfigure 
     */
    setRootWorkflow(rootConfigure) {
        const engineWorkflowConfigure = this.context.engine.configure.get().root.workflow
        const id = engineWorkflowConfigure.id
        /**
         * @type {Partial<import('../../workflow/protocol').WorkflowPluginConfigureReadable>}
         */
        const defaultConfigure = { plugin: engineWorkflowConfigure.plugin }
        const configure = Object.assign({}, defaultConfigure, rootConfigure)
        const scenarioPath = createRootScenarioPath()
        this.workflowDatas.push({ id, scenarioPath, configure })


    }
    parseReadable() {
        let workflowDataIndex = 0
        let executorDataIndex = 0
        while (this.workflowDatas.length > workflowDataIndex || this.executorDatas.length > executorDataIndex) {


            while (this.workflowDatas.length > workflowDataIndex) {

                const workflowData = this.workflowDatas[workflowDataIndex]
                this.parentScenarioPath = workflowData.scenarioPath
                workflowDataIndex++
                const workflowPlugin = this.context.workflows.getPluginFromConfigure(workflowData.configure)




                const flowDatas = workflowPlugin.getFlowDatas(workflowData.configure, this)

                this.context.workflows.addConfigure(
                    workflowData.id,
                    {
                        scenarioPath: workflowData.scenarioPath,
                        flowDatas,
                        options: workflowData.configure.options,
                        plugin: workflowData.configure.plugin
                    }
                )

            }
            while (this.executorDatas.length > executorDataIndex) {
                const executorData = this.executorDatas[executorDataIndex]
                executorDataIndex++
                const plugin = this.context.executors.getPluginFromConfigure(executorData.configure)
                this.parentScenarioPath = executorData.scenarioPath
                /**
                 * @type {import('../../executor/protocol').ExecutorConfigureProtocol}
                 */
                const executorConfigure = {

                    plugin: executorData.configure.plugin,
                    options: executorData.configure.options,
                    scenarioPath: executorData.scenarioPath
                }
                if ('processConfigure' in plugin === true) {
                    // @ts-ignore
                    executorConfigure.subworkflow = plugin.processConfigure(executorData.configure, this)
                }
                this.context.executors.pluginConfigures.set(executorData.id, executorConfigure)




            }
        }

    }

    /**
     * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
     */
    getExecutorId(configure) {
        return this._checkAndGenerateId(configure, this.executorCountId)

    }
    /**
     * @param {import("../../../protocol/plugin/protocol").PluginConfigureReadableProtocolBase<any, {}>} configure
     */
    filterAndGetExcutorId(configure) {
        return this._filterAndGetId(configure, this.executorCountId)
    }

    /**
     * @param {import("../../../protocol/plugin/protocol").PluginConfigureReadableProtocolBase<any, {}>} configure
     * @param {CountId} countId
     * @returns {{isLink:boolean, id:any}}
     */
    _filterAndGetId(configure, countId) {
        const isLink = this._checkIsLink(configure)
        if (isLink === false) {
            return { isLink, id: countId.generate() }

        }
        return { isLink, id: configure.id }
    }

    /**
     * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
     */
    getWorkflowId(configure) {


        return this._checkAndGenerateId(configure, this.workflowCountId)


    }
    /**
     * @param { import("../../../protocol/plugin/protocol").PluginConfigureReadableProtocolBase < any, {} >} configure
    */
    filterAndGetWorkflowId(configure) {
        return this._filterAndGetId(configure, this.workflowCountId)
    }

    /**
    * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
    * @param {CountId} countId 
    */
    _checkAndGenerateId(configure, countId) {
        if (this._checkIsLink(configure) === true) {
            return configure.id
        }
        return countId.generate()

    }
    /**
    * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
    */
    _checkIsLink(configure) {
        return 'id' in configure

    }




}

class ResolverParseContextBuildeClass {
    /**
     * @type {typeof Context}
     */
    contextClass
    /**
     * @type {any}
     */
    buildTarget
    constructor(buildTarget = ResolverParseContextBuildeClass, contextClass = Context) {
        this.contextClass = Context
        this.buildTarget = buildTarget

    }
    /**
     * 
     * @param {Object} param0 
     * @param {*} param0.workflowPlugins 
     * @param {*} param0.executorPlugins 
     * @param {{}} [param0.engineConfigure={}] 
     * @returns {ResolverParseContext}
     */
    build({ workflowPlugins, executorPlugins, engineConfigure = {} }) {
        const context = new this.contextClass()
        context.workflows.setPlugins(workflowPlugins)
        context.executors.setPlugins(executorPlugins)
        context.engine.configure.set(engineConfigure)
        return new this.buildTarget(context)

    }
}

module.exports = { ResolverParseContext, ResolverParseContextBuildeClass }