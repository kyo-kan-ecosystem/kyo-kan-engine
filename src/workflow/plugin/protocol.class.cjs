



/**
 * 
 */
class AbstractWorkflow {
    /**
    * @abstract
    * @param {import("../../controller/protocol").Context<any,any>} context 
      
    * @param {*} configure
    * @returns {import("./protocol").MaybeWorkflowSteps}
    */
    enterWorkflow(context, configure) {
        throw new Error('Method not implemented.')

    }
    /**
    * @abstract
    * @param {import("../../controller/protocol").Context<any,any>} context 
   
    * @param {*} configure
    * @returns {import("./protocol").MaybeWorkflowSteps}
    */
    now(context, configure) {
        throw new Error('Method not implemented.')

    }
    /**
    * @abstract
    * @param {import("../../controller/protocol").Context<any,any>} context 
   
    * @param {*} configure
    * @returns {import("./protocol").MaybeWorkflowSteps}
    */
    go(context, configure) {
        throw new Error('Method not implemented.')

    }

    /**
     * @abstract
     * @param {import("../../controller/protocol").Context<any, any>} context
     * @param {*} request
     * @param {any} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     */
    exitAsSubworkflow(context, request, configure) {
        throw new Error('Method not implemented.')

    }
    /**
     * @abstract
     * @param {import("../../controller/protocol").Context<any, any>} context
     * @param {*} request    
     * @param {any} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     */
    returnFromSubworkflow(context, request, configure) {
        throw new Error('Method not implemented.')

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
     * @param {any} executorConfig
     * @param {any? | undefined} workingObject
     */
    addExecutor(configure, executorId, executorConfig, workingObject) {

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
    exitFromSubworkflow(context, request, configure) {
        /**
         * @type {import("../../controller/protocol").StateType}
         */
        const state = context.states.now.get()


        return { state: null, response: [] }
    }


}



module.exports = { AbstractWorkflow, ProtocolWorkflow }