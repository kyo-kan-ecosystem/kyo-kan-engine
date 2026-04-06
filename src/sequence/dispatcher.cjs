const { AbstractDispatcher } = require("./protocol.class.cjs");




class SequenceDispatcherBase extends AbstractDispatcher {
    /**
   * 
   * @param {*} request 
   * @param {import("../controller/protocol").Context} context 
   * @returns {Promise<import("./protocol").ModeAndContexts>}
   * 
   */

    async enter(request, context) {

        const workflowResponses = context.workflows.go()
        const state = context.states.get()
        let fucname = ''
        const defualtEnterFuncName = context.repositries.configures.engine.get('executor').enterFunc
        if (state === null) {
            fucname = defualtEnterFuncName

        }
        else {
            if (state.controlls?.executeMode === 'wait') {
                fucname = state.controlls?.callback || defualtEnterFuncName
            }
            else {
                fucname = defualtEnterFuncName
            }
        }

        return this._runExecutor(workflowResponses, request, fucname)





    }
    /**
     * 
     * @param {*} request 
     * @param {import("../controller/protocol").Context} context 
     * @returns {Promise<import("./protocol").ModeAndContexts>}
     * 
    */
    async wait(request, context) {
        context.histories.forword(request)

        return [false]
    }
    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context} context 
    * @returns {Promise<import("./protocol").ModeAndContexts>}
    * 
   */
    end(request, context) {
        if (context) {

        }

    }

    /**
     * 
     * @param {import("../controller/protocol").Context<any,any>} context 
    
     * @param {Array} repsponses 
     */
    async go(request, context, repsponses) {
        // TODO 並行実行に対応 
        let executePlugins = context.workflows.go(context)
        if (!executePlugins) {
            context.histories.state.addNewLog

        }
        if (Array.isArray(executePlugins) === false) {
            executePlugins = [executePlugins]
        }
        for (const executePlugin of executePlugins) {

        }
        const state = context.states.get()

        let fucname = ''
        if (state === null) {
            fucname = context.repositries.configures.engine.get('executor').enterFunc

        }
        else {

            fucname = context.repositries.configures.engine.get('executor').enterFunc


        }

        const response = await this._call(executePlugin, fucname, request, context)
        context.histories.forword(request, response)
        repsponses.push(response)
        return repsponses
    }
    /**
     * 
     * @param {import("../controller/protocol").Context<any,>} context 
     * @param {*} state 
     * @param {*} repsponse 
     */
    goSub(context, state, repsponse) {
        context.goSub();
        const subExecuteFunc = context.workflows.getCurrentWorkflow().enterWorkflow(context);

    }



    back(context, state, repsponse) {
        const _request = context.back()
        const backWorkflow = context.workflows.getCurrentWorkflow();
        const backExecuteFunc = backWorkflow.back(context);
        funcsArray.push(backExecuteFunc);

    }
    rewindWorkflow() {


        const _request = context.reset();
        const resetWorkflow = context.workflows.getCurrentWorkflow();
        const resetExecuteFunc = resetWorkflow.resetBack(context);
        funcsArray.push(resetExecuteFunc);
    }
    rewindReturn(context, state, response) {
        const isTopOnRewindReturn = context.endSub();
        if (!isTopOnRewindReturn) {
            return { state, responses };
        }
        const superWorkflowOnResetReturn = context.workflows.getCurrentWorkflow();
        const executeFuncOnResetReturn = superWorkflowOnResetReturn.returnAsReset(context);
        funcsArray.push(executeFuncOnResetReturn);

    }
    /**
     * 
     * @param {import("../workflow/plugin/protocol").WorkflowResponses} workflowResponses 
     * @param {*} request 
     * @param {*} fucname 
     * @returns 
     */
    async _runExecutor(workflowResponses, request, fucname) {
        /**
         * @type {import("./protocol").ModeAndContexts}
         */
        const results = []
        for (const workflowResponse of workflowResponses) {
            if (workflowResponse === false) {
                results.push(false)
                continue
            }
            await this._call(workflowResponse.executor, fucname, request, workflowResponse.context)
            results.push({ context: workflowResponse.context })

        }
        return results
    }
    _call(plugin, funcname, request, context) {
        return plugin[funcname].call(request, context)

    }

}

module.exports = { SequenceDispatcherBase }








