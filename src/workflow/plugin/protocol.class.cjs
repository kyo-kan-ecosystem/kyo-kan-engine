const { isVoid } = require("../../util/is_void.cjs")


/**
 * @template  [StateType=any]
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
     * @param {any} request
     * @returns {import("./protocol").MaybeWorkflowSteps}
     *
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
        return { context }

    }
    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} request    
     * @param {any} configure
     * @returns {import("./protocol").MaybeWorkflowSteps}
     */
    returnFromSubworkflow(context, request, configure) {
        return { context }

    }




    /**
     * @abstract
     * @type {import("./protocol").WorkflowGetMemberExecutorsFunction}
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
    /**
     * @param {import("../../states/protocol").Context<any,any> } context 
     * @param {StateType} state
     * @param {boolean} [isFullOverWrite=true]  
     */
    setState(context, state, isFullOverWrite = true) {
        // @ts-ignore
        context.states.now.update({ workflow: state }, isFullOverWrite)


    }




}


module.exports = { AbstractWorkflow }