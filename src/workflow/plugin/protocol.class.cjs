const { isVoid } = require("../../util/is_void.cjs")


/**
 * @template  [StateType=any], [ExecutorsType=any], [ExecutorsReadableType=any], [RequestType=any], [OptionsType=any]
 */
class AbstractWorkflow {
    /**
     * @abstract
     * @type {import("./protocol").WorflowControllFunction}
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
     * @param {import("../protocol").WorkflowPluginConfigureReadable} configure
     * @param {import("../../resolver/interfacade/parse_context.cjs").ResolverParseContext} resolveContext 
     * @returns {any}
     */
    getMemberExecutors(configure, resolveContext) {
        throw new Error('not implemt')
    }

    /**
     * 
     * @param {import("../../states/protocol").Context<any,any> } context 
     * @param {StateType} defaultState
     * @returns {StateType} 
     */
    getState(context, defaultState) {
        const state = context.states.now.get().workflow?.state
        if (isVoid(state) === true) {
            return defaultState
        }
        return state
    }




}



module.exports = { AbstractWorkflow }