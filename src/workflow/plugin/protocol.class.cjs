const { isVoid } = require("../../util/is_void.cjs")


/**
 * @template  [StateType=any], [InitStateType=any]
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
    * @returns {import("../../../protocol").MaybeContexts}
    * 
    * 
    */
    enterAsSubworkflow(context, configure, request) {
        return context

    }

    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} configure 
     * @param {any} request
     * @returns {import("../../../protocol").MaybeContexts}
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
    * @returns {import("../../../protocol").MaybeContexts}
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
     * @returns {import("../../../protocol").MaybeContexts}
     */
    exitFromSubworkflow(context, request, configure) {
        return context

    }
    /**
     * @abstract
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {*} request    
     * @param {any} configure
     * @returns {import("../../../protocol").MaybeContexts}
     */
    returnFromSubworkflow(context, request, configure) {
        return context

    }




    /**
     * @abstract
     * @type {import("./protocol").WorkflowGetFlowDatasFunction}
     */
    getFlowDatas(configure, resolveContext) {
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
    /**
     * @param {import("../../states/protocol").Context<any, any>} context
     * @param {InitStateType?} [defaultInitState=undefined] 
     * @returns {InitStateType}
     */
    getInitState(context, defaultInitState = undefined) {
        const state = context.states.now.get().workflow?.initState
        if (isVoid(state) === true) {
            // @ts-ignore
            return defaultInitState
        }
        return state

    }
    /**
     * @param {import("../../states/protocol").Context<any, any>} context
     */
    getWorkflowState(context) {
        return context.states.now.get().workflow

    }




}


module.exports = { AbstractWorkflow }