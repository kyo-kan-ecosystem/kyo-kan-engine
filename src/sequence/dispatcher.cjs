const { AbstractDispatcher } = require("./protocol.class.cjs");




class SequenceDispatcherBase extends AbstractDispatcher {
    /**
   * 
   * @param {*} request 
   * @param {import("../controller/protocol").Context<any,any>} context 
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
        const results = []
        for (const workflowResponse of workflowResponses) {
            if (workflowResponse === false) {
                continue
            }
            await this._call(workflowResponse.executor, fucname, request, workflowResponse.context)
            results.push({ context: workflowResponse.context })

        }
        return results




    }
    async wait(context, repsponses) {
        return false
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
    /**
     * 
     * @param {import("../controller/protocol").Context<any,>} context 
     * @param {*} state 
     * @param {*} repsponse 
     */
    end(context, state, repsponse) {
        const isTopOnEnd = context.endSub();
        if (!isTopOnEnd) {
            return { state, responses };
        }
        const superWorkflowOnEnd = context.workflows.getCurrentWorkflow();
        const superExecuteFuncOnEnd = superWorkflowOnEnd.returnFromSubworkflow(context);
        funcsArray.push(superExecuteFuncOnEnd);

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
        break;
    }
    _call(plugin, funcname, request, context) {
        return plugin[funcname].call(request, context)

    }

}

module.exports = { SequenceDispatcherBase }








