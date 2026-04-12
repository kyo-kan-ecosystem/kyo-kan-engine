import { ensureArray } from "../util/ensure_array.cjs";

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

        const workflowSteps = context.workflows.now()

        const state = context.states.get()
        let fucname = ''
        const defualtEnterFuncName = context.repositries.configures.engine.get('executor').enterFunc

        if (state?.controlls?.executeMode === 'wait') {
            fucname = state.controlls?.callback || defualtEnterFuncName
        }
        else {
            fucname = defualtEnterFuncName
        }


        return await this._runExecutor(workflowResponses, request, fucname)




    }

    /**
     * 
     * @param {*} request 
     * @param {import("../controller/protocol").Context<any, any>} context 
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
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").ModeAndContexts>}
    * 
   */
    async end(request, context) {
        context.histories.forword(request)

        return [false]

    }

    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").ModeAndContexts>}
    * 
   */
    async go(request, context) {
        context.histories.forword(request)
        // TODO 並行実行に対応 
        let executePlugins = context.workflows.go()
        if (!executePlugins) {
            if (context.isRoot() === false) {
                return [{ mode: '' }]

            }


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
     * @param {import("../workflow/plugin/protocol").MaybeWorkflowSteps} workflowSteps 
     * @param {*} request 
     * @param {*} fucname 
     * @returns 
     */
    _runExecutor(workflowSteps, request, fucname = null) {
        /**
         * @type {Promise<import("./protocol").ModeAndContext>[]}
         */
        const proms = []

        /**
         * @type {import("../workflow/plugin/protocol").WorkflowSteps}
         */
        const _workflowSteps = ensureArray(workflowSteps)
        for (const workflowStep of _workflowSteps) {
            if (workflowStep === false) {
                proms.push(new Promise(this._falseResolve))
                continue
            }
            const _funcname = workflowStep.callback || fucname

            const prom = this._call(workflowStep.executor, fucname, request, workflowStep.context)
            proms.push(prom)

        }
        return proms
    }
    /**
     * @param {{[k in string]:import("../../protocol/executor/protocol").ExecutorFunction}} plugin
     * @param {string} funcname
     * @param {any} request
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @returns {Promise<import("./protocol").ModeAndContext>}
     */
    async _call(plugin, funcname, request, context) {
        await plugin[funcname].call(plugin, request, context)
        return { context }

    }
    /**
     * @param {any} resolve
     */
    _falseResolve(resolve) {
        resolve(false)
    }

}

module.exports = { SequenceDispatcherBase }








