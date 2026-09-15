/**
 * 
 */
class AbstractWorkflow {
    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     * @param {any} request
     */
    enterWorkflow(context, configure, request) {
        throw new Error('Method not implemented.')

    }
    /**
    * @abstract
    * @param {import("../../states/protocol").Context<any,any>} context 
    * @param {*} configure
    * @param {*} request 
    * @returns {import("./protocol").MaybeWorkflowSteps}
    * 
    * 
    */
    enterAsSubworkflow(context, configure, request) {
        throw new Error('Method not implemented.')

    }

    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     * @param {any} request
     */
    now(context, configure, request) {
        throw new Error('Method not implemented.')

    }
    /**
    * @abstract
    * @param {import("../../states/protocol").Context<any,any>} context 
   
    * @param {*} configure
    * @param {*} request 
    * @returns {import("./protocol").MaybeWorkflowSteps}
    * 
    */
    go(context, configure, request) {
        throw new Error('Method not implemented.')

    }

    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} request
     * @param {any} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     */
    exitFromSubworkflow(context, request, configure) {
        throw new Error('Method not implemented.')

    }
    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} request    
     * @param {any} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     */
    returnFromSubworkflow(context, request, configure) {
        throw new Error('Method not implemented.')

    }




    /**
     * @abstract
     * @param {any} configure

     * @returns {{configure:import("../protocol").WorkflowConfigure}, executors:any}}
     */
    getConfigureParams(configure) {
        throw new Error('not implemt')
    }
    /**
     * @abstract
     * @param {*} configure
     * @param {*} executorId
     * @param {any} executorConfig
     * @param {any?} workingObject
     */
    addExecutor(configure, executorId, executorConfig, workingObject) {
        throw new Error('not implemt')
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





module.exports = { AbstractWorkflow }