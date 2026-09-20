const { CountId } = require('../../util/count_id.cjs')

class ResolverParseContext {

    context
    /**
     * @type {CountId}
     */
    executorCountId


    /**
     * 
     * @param {import('../../context/index.cjs').Context} context 
     */
    constructor(context) {
        this.context = context

        this.executorCountId = new CountId()

    }
    /**
     * @param {import('../../../protocol/plugin/protocol').PluginConfigureReadableProtocolBase} configure
     */
    getExecutorId(configure) {
        if ('id' in configure) {
            return configure.id
        }
        return this.executorCountId.generate()

    }




}

module.exports = { ResolverParseContext }