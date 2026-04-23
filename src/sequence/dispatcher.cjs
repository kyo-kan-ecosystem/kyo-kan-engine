import { BootCallbackDoesNotExistsError } from "./protocol.error.cjs"

const { ensureArray } = require("../util/ensure_array.cjs")

const { AbstractDispatcher } = require("./protocol.class.cjs")



class SequenceDispatcherBase extends AbstractDispatcher {
    /**
      * 
      * @param {*} request 
      * @param {import("../controller/protocol").Context<any,any>} context 
      * @returns {Promise<Promise<import("./protocol").StepResult>[]>}
      * 
      */

    async start(request, context) {
        const bootExecutors = context.repositries.configures.boot.getAll()
        const bootPromies = []
        const bootCallbackName = context.repositries.configures.engine.get().boot.callback
        for (const { plugin, configure } of bootExecutors) {
            const executor = context.repositries.plugins.executors.get(plugin)
            if (bootCallbackName in executor === false) {
                throw new BootCallbackDoesNotExistsError(plugin, bootCallbackName)

            }

            bootPromies.push(executor[bootCallbackName].call(configure, request, context))



        }
        await Promise.all(bootPromies)

        const workflowSteps = context.workflows.start()
        return this._runEnterFunction(request, context, workflowSteps)



    }
    /**
     * 
     * @param {*} request 
     * @param {*} context 
     * @param {*} workflowSteps 
     * @returns 
     */
    _runEnterFunction(request, context, workflowSteps) {
        const defaultCallback = context.repositries.configures.engine.get().executor.enterFunc




        return this._runExecutor(workflowSteps, request, defaultCallback)
    }

    /**
   * 
   * @param {*} request 
   * @param {import("../controller/protocol").Context<any,any>} context 
   * @returns {Promise<import("./protocol").StepResult>[]}
   * 
   */

    resume(request, context) {



        const workflowSteps = context.workflows.now()



        const defaultCallback = context.repositries.configures.engine.get().executor.enterFunc




        return this._runExecutor(workflowSteps, request, defaultCallback)




    }

    /**
     * 
     * @param {*} request 
     * @param {import("../controller/protocol").Context<any, any>} context 
     * @returns {Promise<import("./protocol").StepResult>[]}
     * 
    */
    wait(request, context) {
        context.histories.forword(request)


        return [Promise.resolve(false)]
    }
    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    end(request, context) {
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
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    go(request, context) {
        context.histories.forword(request)
        /**
         * @type {Promise<import("./protocol").StepResult>[]}
         */
        const proms = []
        /**
         * @type { import("../workflow/plugin/protocol").WorkflowSteps }
         */
        const workflowSteps = ensureArray(context.workflows.go())
        /**
         * @type { import("../workflow/plugin/protocol").WorkflowSteps }
         */
        const _workflowSteps = []

        for (const workflowStep of workflowSteps) {

            if (workflowStep.context.states.controll.getExecuteMode() !== 'go') {


                proms.push(Promise.resolve({ context: workflowStep.context }))
                continue


            }
            _workflowSteps.push(workflowStep)

        }

        return proms.concat(this._runExecutor(_workflowSteps, request, null, true))

    }

    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */
    goSub(request, context) {

        context.histories.forword(request)

        const { workflowSteps, workflowId } = context.workflows.goSub()
        return this._startWorkflow(workflowSteps, workflowId)
    }
    /**
     * @param {any} workflowSteps
     * @param {any} workflowId
     */
    _startWorkflow(workflowSteps, workflowId) {
        /**
       * @type { import("../workflow/plugin/protocol").WorkflowSteps }
       */
        const ensuredWorkfloSteps = ensureArray(workflowSteps)
        const results = []

        for (const workflowStep of ensuredWorkfloSteps) {
            workflowStep.context.states.now.update({ workflow: { id: workflowId } })
            if (!workflowStep.context.states.controll.getExecuteMode()) {
                workflowStep.context.states.controll.setExecuteMode('go')
            }

            results.push(Promise.resolve({ context: workflowStep.context }))
        }

        return results










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

            const _callback = workflowStep.callback || defaultCallback

            const prom = this._call(workflowStep.executor, _callback, request, workflowStep.context)
            proms.push(prom)

        }
        return proms
    }
    /**
     * @param {{[k in string]:import("../../protocol/executor/protocol").ExecutorFunction}} executorId
     * @param {string} callback
     * @param {any} request
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @returns {Promise<import("./protocol").StepResult>}
     */
    async _call(executorId, callback, request, context) {
        if (typeof executorId === 'undefined' || executorId === null) {
            return { context }
        }
        const executerConfigure = context.repositries.configures.executors.get(executorId)

        await context.repositries.plugins.executors.get(executerConfigure.plugin)[callback].call(request, context)
        return { context }

    }


}

module.exports = { SequenceDispatcherBase }








