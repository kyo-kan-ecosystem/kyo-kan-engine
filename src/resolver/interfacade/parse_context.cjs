const { CountId } = require('../../util/count_id.cjs')

class ResolverParseContext {

    context
    /**
     * @type {CountId}
     */
    executorCountId

    /**
     * @type {CountId}
     */
    workflowCountId

    /**
     * 
     * @param {import('../../context/index.cjs').Context} context 
     */
    constructor(context) {
        this.context = context

        this.executorCountId = new CountId()
        this.workflowCountId = new CountId()

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