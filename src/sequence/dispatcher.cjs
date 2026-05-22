const { BootCallbackDoesNotExistsError } = require("./protocol.error.cjs")

const { ensureArray } = require("../util/ensure_array.cjs")

const { AbstractDispatcher } = require("./protocol.class.cjs")



class SequenceDispatcherBase extends AbstractDispatcher {
    /**
      * 
      * @param {*} request 
      * @param {import("../states/protocol").Context<any,any>} context 
      * @returns {Promise<Promise<import("./protocol").StepResult>[]>}
      * 
      */

    async start(context, request) {

        await this._boot(context, request)
        context.histories.forword(request)
        const workflowSteps = context.workflows.start(context, context.states.now.get(), request)
        const results = this._runEnterFunction(context, request, workflowSteps)
        context.states.setNotStart()
        return results



    }
    /**
     * 
     * @param {*} request 
     * @param {import("../states/protocol").Context<any,any>} context  
     */
    _boot(context, request) {
        const bootExecutors = context.executors.getBootPlugins()
        const bootPromies = []
        const bootCallbackName = context.repositries.configures.engine.get().boot.callback
        for (const { executor, options } of bootExecutors) {

            if (bootCallbackName in executor === false) {
                throw new BootCallbackDoesNotExistsError(executor, bootCallbackName)

            }

            bootPromies.push(executor[bootCallbackName].call(options, context, request))



        }
        return Promise.all(bootPromies)
    }

    /**
     * 
     * @param {*} request 
     * @param {*} context 
     * @param {*} workflowSteps 
     * @returns 
     */
    _runEnterFunction(context, request, workflowSteps) {
        const defaultCallback = context.repositries.configures.engine.get().executor.enterFunc




        return this._runExecutor(workflowSteps, request, defaultCallback)
    }

    /**
   * 
   * @param {*} request 
   * @param {import("../states/protocol").Context} context 
   * @returns {Promise<Promise<import("./protocol").StepResult>[]>}
   * 
   */

    async resume(context, request) {


        if (context.states.isBoot() === true) {
            await this._boot(context, request)
            context.states.setNotBoot()
        }
        const workflowSteps = context.workflows.now(context, context.states.now.get(), request)
        const defaultCallback = context.repositries.configures.engine.get().executor.enterFunc
        return this._runExecutor(workflowSteps, request, defaultCallback)




    }

    /**
     * 
     * @param {*} request 
     * @param {import("../states/protocol").Context<any, any>} context 
     * @returns {Promise<import("./protocol").StepResult>[]}
     * 
    */
    wait(context, request) {
        context.histories.forword(request)


        return [Promise.resolve(false)]
    }
    /**
    * 
    * @param {*} request 
    * @param {import("../states/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    end(context, request) {
        context.histories.forword(request)
        if (context.states.isRoot() === false) {
            context.states.controll.setExecuteMode('returnFromSub')

            return [Promise.resolve({ context })]

        }

        return [Promise.resolve(false)]

    }

    /**
    * 
    * @param {*} request 
    * @param {import("../states/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    go(context, request) {
        context.histories.forword(request)
        /**
         * @type {Promise<import("./protocol").StepResult>[]}
         */
        const proms = []
        /**
         * @type { import("../workflow/plugin/protocol").WorkflowSteps }
         */
        const workflowSteps = ensureArray(context.workflows.go(context, context.states.now.get(), request))
        /**
         * @type { import("../workflow/plugin/protocol").WorkflowSteps }
         */
        const filteredSteps = []

        for (const workflowStep of workflowSteps) {
            const executeMode = workflowStep.context.states.controll.getExecuteMode(false)
            if (!executeMode) {
                workflowStep.context.states.controll.setExecuteMode('go')
            }
            else if (executeMode !== 'go') {


                proms.push(Promise.resolve({ context: workflowStep.context }))
                continue


            }

            filteredSteps.push(workflowStep)

        }

        return proms.concat(this._runExecutor(filteredSteps, request, null, true))

    }

    /**
    * 
    * @param {*} request 
    * @param {import("../states/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    goSub(context, request) {

        context.histories.forword(request)

        context.resolver.resolveGoSubProcess()

        const workflowSteps = context.workflows.goSub(context, context.states.now.get(), request)
        return this._workflowStepsToPromise(workflowSteps, 'go')

    }













    /**
    * 
    * @param {*} request
    * @param {import("../states/protocol").Context} context
    * @returns {Promise <import("./protocol").StepResult>[]}
    * 
   */

    returnFromSub(context, request) {
        context.histories.forword(request)
        const { workflowState, subworkflowState } = context.resolver.resolveReturnFromSubProcess()
        const workflowSteps = context.workflows.returnFromSub(workflowState, subworkflowState, context, request)

        return this._workflowStepsToPromise(workflowSteps, 'callback')





    }
    /**
     * 
     * @param {import("../workflow/plugin/protocol").MaybeWorkflowSteps} workflowsteps 
     * @param {import("./protocol").ExecuteMode} defaultExecuteMode 
     * @returns {Promise<import("./protocol").StepResult>[]}
     */
    _workflowStepsToPromise(workflowsteps, defaultExecuteMode) {
        const results = []
        const ensuredWorkflowSteps = ensureArray(workflowsteps)

        for (const workflowStep of ensuredWorkflowSteps) {
            if (!workflowStep.context.states.controll.getExecuteMode(false)) {
                workflowStep.context.states.controll.setExecuteMode(defaultExecuteMode)

            }
            results.push(Promise.resolve({ context: workflowStep.context }))
        }
        return results
    }
    /**
     * 
    *  @param {import("../states/protocol").Context} context
     * @param {any} request
     */
    callback(context, request) {
        context.histories.forword(request)
        const workflowSteps = context.workflows.now(context, context.states.now.get(), request)
        const proms = this._runExecutor(workflowSteps, request, true)
        const results = []
        for (const prom of proms) {
            prom.then(this._updateExecuteMode)
            results.push(prom)

        }
        return results



    }
    /**
     * 
     * @param {import("./protocol").StepResult} stepresult 
     */
    _updateExecuteMode(stepresult) {
        if (stepresult === false) {
            return stepresult
        }
        if (stepresult.context.states.controll.getExecuteMode() === 'callback') {

            stepresult.context.states.controll.setExecuteMode('go')


        }
        return stepresult


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
     * @param {*} defaultCallback 
     * @returns 
     */
    _runExecutor(workflowSteps, request, defaultCallback = null, isEnsured = false) {
        /**
         * @type {Promise<import("./protocol").StepResult>[]}
         */
        const proms = []

        /**
         * @type {import("../workflow/plugin/protocol").WorkflowSteps}
         */
        // @ts-ignore
        const _workflowSteps = isEnsured === true ? workflowSteps : ensureArray(workflowSteps)
        for (const workflowStep of _workflowSteps) {

            const _callback = workflowStep.context.states.controll.getCallback() || defaultCallback

            const prom = this._call(workflowStep.executor, _callback, request, workflowStep.context)
            proms.push(prom)

        }
        return proms
    }
    /**
     * @param {any} executorId
     * @param {string} callback
     * @param {any} request
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @returns {Promise<import("./protocol").StepResult>}
     */
    async _call(executorId, callback, context, request) {
        if (typeof executorId === 'undefined' || executorId === null) {
            return { context }
        }
        const { options: configure, executor } = context.executors.getOptionsAndExecutor(executorId)

        await executor[callback].call(context, request, configure)
        return { context }

    }


}

module.exports = { SequenceDispatcherBase }








