const { extendConfigurePath, createWorkflowConfigurePath, createExecutorConfigurePath, createBootConfigurePath, createRootConfigurePath } = require('../../../interfacde/configure/configure_path.cjs')
const { CountId } = require('../../util/count_id.cjs')
const { isVoid } = require('../../util/is_void.cjs')


/**
 * @typedef {{id:any, configure:any, configurePath:import('../../../interfacde/configure/protocol').ConfigurePath}} ConfigureData
 * @typedef {ConfigureData[]}ConfigureDatas
 */
class ResolverParseContext {

    context
    /**
     * @type {CountId}
     */
    executorCountId

    /**
     * @type {number}
     */
    executorDataIndex
    /**
     * @type {ConfigureDatas}
     */
    executorDatas


    /**
     * @type {CountId}
     */
    workflowCountId

    /**
     * @type {number}
     */
    workflowDataIndex

    /**
     * @type {ConfigureDatas}
    */
    workflowDatas

    /**
     * @type {import('../../../interfacde/configure/protocol').ConfigurePath?}
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
            configurePath.expressions.push(index)
            this.executorDatas.push({ id, configure, configurePath })
        }


    }
    /**
     * 
     * @param {*} rootConfigure 
     */
    setRootConfigure(rootConfigure) {
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
            return { isLink, id: countId.generate }

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