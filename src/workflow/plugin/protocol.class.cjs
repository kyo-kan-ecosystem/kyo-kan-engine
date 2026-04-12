



/**
 * 
 */
class AbstractWorkflow {

    /**
    * @abstract
    * @param {import("../../controller/protocol").Context<any,any>} context 
   
    * @param {*} configure
    * @returns {import("./protocol").WorkflowStep}
    */
    now(context, configure) {
        throw new Error('Method not implemented.')

    }
    /**
    * @abstract
    * @param {import("../../controller/protocol").Context<any,any>} context 
   
    * @param {*} configure
    * @returns {import("./protocol").WorkflowStep}
    */
    go(context, configure) {
        throw new Error('Method not implemented.')

    }

    /**
     * @abstract
     * @param {import("../../controller/protocol").Context<any, any>} context
     * @param {*} request
     * @returns {{state: any;response: any[];}}
     * @param {any} configure
     */
    returnFromSubworkflow(context, request, configure) {
        return { state: null, response: [] }
    }
    /**
     * @param {import("../../controller/protocol").Context<any, any>} context
     * @param {any} request
     * @param {any} configure
     */
    _getExecutorPlugin(context, request, configure) {
        const pluginId = this._getPluginId(context, request, configure)
        return context.repositries.plugins.executors.get(pluginId)
    }
    /**
     * @abstract
     * @param {import("../../controller/protocol").Context<any, any>} context
     * @param {any} request
     * @param {any} configure
     * @returns {any}
     */
    _getPluginId(context, request, configure) {
        return ''

    }
    /**
     * @abstract
     * @param {any} configure
     * @param {any} executorId 
     * @returns {import("../protocol").WorkflowConfigureParseResult}
     */
    getConfigureParams(configure, executorId) {
        return {}
    }
    /**
     * @abstract
     * @param {*} configure 
     * @param {*} executorId 
     */
    addExecutor(configure, executorId, executorConfig) {

    }
    /**
     * @abstract
     * @param {*} context 
     * @param {*} configure
     * @returns {*} 
     */
    getExecuteFunction(context, configure) {

    }




}

class ProtocolWorkflow extends AbstractWorkflow {
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



module.exports = { AbstractWorkflow, ProtocolWorkflow }