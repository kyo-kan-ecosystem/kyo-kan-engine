




class AbstarctWorkflow {
    /**
     * @abstract
     * @param {import("../../controller/protocol").Context} context 
     * @param {*} request
     * @param {*} configure
     * @returns {{state:any, response:any[]}} 
     */
    go(context, request, configure) {
        return { state: null, response: [] }
    }

    /**
     * @abstract
     * @param {import("../../controller/protocol").Context} context
     * @param {*} request
     * @returns {{state: any;response: any[];}}
     * @param {any} configure
     */
    returnFromSubworkflow(context, request, configure) {
        return { state: null, response: [] }
    }
    /**
     * @param {import("../../controller/protocol").Context} context
     * @param {any} request
     * @param {any} configure
     */
    _getExecutorPlugin(context, request, configure) {
        const pluginId = this._getPluginId(context, request, configure)
        return context.repositries.plugins.executors.get(pluginId)
    }
    /**
     * @abstract
     * @param {import("../../controller/protocol").Context} context
     * @param {any} request
     * @param {any} configure
     * @returns {any}
     */
    _getPluginId(context, request, configure) {
        return ''

    }


}

class ProtocolWorkflow extends AbstarctWorkflow {
    /**
     *
     * @param {import("../../controller/protocol").Context} context
     * @param {*} request
     * @returns {{state: any;response: any[];}}
     * @param {any} configure
     */
    returnFromSubworkflow(context, request, configure) {
        /**
         * @type {import("../../controller/protocol").StateType}
         */
        const state = context.states.get()


        return { state: null, response: [] }
    }


}



module.exports = { AbstarctWorkflow }