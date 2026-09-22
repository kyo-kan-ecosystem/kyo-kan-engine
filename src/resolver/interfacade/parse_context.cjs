const { CountId } = require('../../util/count_id.cjs')
const { isVoid } = require('../../util/is_void.cjs')


/**
 * 
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
     * @type {{id:any, configure:any, configurePath:import('../../../interfacde/configure/protocol').ConfigurePath}[]}
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
     * @type {{id:any, configure:any, configurePath:import('../../../interfacde/configure/protocol').ConfigurePath}[]}
    */
    workflowDatas
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

    }
    /**
     * 
     * @param {import('../../workflow/protocol').WorkflowPluginConfigureReadable} configure
     * @param {any[]} [configurePathExpression=[]]
     * @param {Con} parentConfigurePath  
     * @param  {any?} id
     */
    pushWorkflowdata(configure, parentConfigurePath, configurePathExpression = [], id = undefined) {
        let resultId

        if (isVoid(id) === true) {
            const { isIdExist, id: targetId } = this.filterAndGetWorkflowId(configure)
            if (isIdExist === false) {
                // @ts-ignore
                const plugin = this.context.workflows.getPlugin(configure.plugin)
                const executorIDs = plugin.getMemberExecutors(configure, this)
                this.context.workflows.addConfigure(targetId, {})

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
     * @returns {{isIdExist:boolean, id:any}}
     */
    _filterAndGetId(configure, countId) {
        const isIdExist = this._checkId(configure)
        if (isIdExist === false) {
            return { isIdExist, id: countId.generate }

        }
        return { isIdExist, id: configure.id }
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
        if (this._checkId(configure) === true) {
            return configure.id
        }
        return countId.generate()

    }
    /**
    * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
    */
    _checkId(configure) {
        return 'id' in configure

    }




}

module.exports = { ResolverParseContext }