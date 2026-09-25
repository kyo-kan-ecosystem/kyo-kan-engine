const { extendConfigurePath, createWorkflowConfigurePath, createExecutorConfigurePath, createBootConfigurePath, createRootConfigurePath } = require('../../../interfacade/configure/configure_path.cjs')
const { CountId } = require('../../util/count_id.cjs')



/**
 * @typedef {{id:any, configure:any, configurePath:import('../../../interfacade/configure/protocol').ConfigurePath}} ConfigureData
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
     * @type {import('../../../interfacade/configure/protocol').ConfigurePath?}
     */
    parentConfigurePath
    /**
     * 
     * @param {import('../../context/index.cjs').Context} context 
     */
    constructor(context) {
        this.context = context

        this.executorCountId = new CountId()
        this.workflowCountId = new CountId()

        this.executorDataIndex = 0
        this.workflowDataIndex = 0

        this.executorDatas = []
        this.workflowDatas = []
        this.parentConfigurePath = null



    }
    /**
     * 
     * @param {import('../../workflow/protocol').WorkflowPluginConfigureReadable} configure
     * @param {any[]} configurePathExpression
     *  
     * 
     * 
     */
    pushWorkflowdata(configure, configurePathExpression) {



        const { isLink, id } = this.filterAndGetWorkflowId(configure)
        if (isLink === false) {
            // @ts-ignore
            const configurePath = extendConfigurePath(this.parentConfigurePath, configurePathExpression)

            // @ts-ignore
            this.workflowDatas.push({ id, configure, configurePath })


        }
        return id





    }
    /**
     * @param {any} id
     * @param {any} configure
     */
    pushNamedWorkflow(id, configure) {
        const configurePath = createWorkflowConfigurePath()
        configurePath.expressions.push(id)
        this.workflowDatas.push({ id, configure, configurePath })


    }
    /**
     * 
     * @param {import('../../workflow/protocol').WorkflowPluginConfigureReadable} configure
     * @param {any[]} configurePathExpression
     *  
     * 
     * 
     */
    pushExecutordata(configure, configurePathExpression) {



        const { isLink, id } = this.filterAndGetExcutorId(configure)
        if (isLink === false) {
            // @ts-ignore
            const configurePath = extendConfigurePath(this.parentConfigurePath, configurePathExpression)


            this.workflowDatas.push({ id, configure, configurePath })


        }
        return id





    }
    /**
     * @param {any} id
     * @param {any} configure
     */
    pushNamedExecutor(id, configure) {
        const configurePath = createExecutorConfigurePath()
        configurePath.expressions.push(id)
        this.executorDatas.push({ id, configure, configurePath })


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
            const configurePath = createBootConfigurePath()
            configurePath.expressions.push(id)
            this.executorDatas.push({ id, configure, configurePath })
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
        const configurePath = createRootConfigurePath()
        this.workflowDatas.push({ id, configurePath, configure })


    }
    parseReadable() {
        let workflowDataIndex = 0
        let executorDataIndex = 0
        while (this.workflowDatas.length > workflowDataIndex || this.executorDatas.length > executorDataIndex) {


            while (this.workflowDatas.length > workflowDataIndex) {

                const workflowData = this.workflowDatas[workflowDataIndex]
                this.parentConfigurePath = workflowData.configurePath
                workflowDataIndex++
                const workflowPlugin = this.context.workflows.getPluginFromConfigure(workflowData.configure)




                const executorIDs = workflowPlugin.getMemberExecutors(workflowData.configure, this)

                this.context.workflows.addConfigure(
                    workflowData.id,
                    {
                        configurePath: workflowData.configurePath,
                        executorIDs,
                        options: workflowData.configure.options,
                        plugin: workflowData.configure.plugin
                    }
                )

            }
            while (this.executorDatas.length > executorDataIndex) {
                const executorData = this.executorDatas[executorDataIndex]
                executorDataIndex++
                const plugin = this.context.executors.getPluginFromConfigure(executorData.configure)
                this.parentConfigurePath = executorData.configurePath
                /**
                 * @type {import('../../executor/protocol').ExecutorConfigureProtocol}
                 */
                const executorConfigure = {

                    plugin: executorData.configure.plugin,
                    options: executorData.configure.options,
                    configurePath: executorData.configurePath
                }
                if ('getSubworkflow' in plugin === true) {
                    // @ts-ignore
                    executorConfigure.subworkflow = plugin.getSubworkflow(executorData.configure.options, this)
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

module.exports = { ResolverParseContext }