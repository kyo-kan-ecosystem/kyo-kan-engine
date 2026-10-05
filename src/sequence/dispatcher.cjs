const { BootCallbackDoesNotExistsError } = require("./protocol.error.cjs")

const { ensureArray } = require("../util/ensure_array.cjs")

const { AbstractDispatcher } = require("./protocol.class.cjs")
const { isVoid } = require("../util/is_void.cjs")





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
        return this._workflowStepsToPromise(workflowSteps, 'go')





    }

    /**
     * 
     * @param {*} request 
     * @param {import("../states/protocol").Context<any,any>} context  
     */
    _boot(context, request) {
        const bootExecutors = context.executors.getBootPlugins()
        const bootPromies = []
        const bootCallbackName = context.engine.configure.get().boot.callback
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
   * @returns {Promise<import("./protocol").StepResult>}
   * 
   */

    async resume(context, request) {


        if (context.states.isBoot() === true) {
            await this._boot(context, request)
            context.states.setNotBoot()
        }
        context.resolver.resolveWaitToResumeProcess()
        context.histories.forword(request)

        if (context.states.controll.checkCallback() === false) {
            context.states.controll.setCallback(context.engine.configure.get().executor.enterFunc)

        }
        return context







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
        context.resolver.resolveWaitToResumeProcess()


        return [Promise.resolve(false)]
    }
    /**
    * 
    * @param {*} request 
    * @param {import("../states/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").StepResult>}
    * 
   */
    end(context, request) {
        context.histories.forword(request)

        return Promise.resolve(false)

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
         * @type {import("../../protocol").Contexts}
         */
        const contexts = ensureArray(context.workflows.go(context, context.states.now.get(), request))
        /**
         * @type { import("../../protocol").Contexts }
         */
        const filteredSteps = []

        for (const context of contexts) {
            const executeMode = context.states.controll.getExecuteMode(false)
            if (isVoid(executeMode)) {
                context.states.controll.setExecuteMode('go')
            }
            else if (executeMode !== 'go') {


                proms.push(Promise.resolve(context))
                continue


            }

            filteredSteps.push(context)

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
    * @returns {Promise<import("./protocol").StepResult>[]}
    * 
   */

    returnFromSub(context, request) {
        context.histories.forword(request)

        const contexts = context.resolver.resolveReturnFromSubProcess(request)

        return this._workflowStepsToPromise(contexts, 'callback')





    }
    /**
     * @typedef {}
     * @param {import("../../protocol").MaybeContexts} contexts 
     * @param {import("./protocol").ExecuteMode} defaultExecuteMode 
     * @returns {Promise<import("./protocol").StepResult>[]}
     */
    _workflowStepsToPromise(contexts, defaultExecuteMode) {
        const results = []
        /**
         * @type {import("../../protocol").Contexts}
         */
        const ensuredContexts = ensureArray(contexts)

        for (const context of ensuredContexts) {
            if (!context.states.controll.getExecuteMode(false)) {
                context.states.controll.setExecuteMode(defaultExecuteMode)

            }
            results.push(Promise.resolve(context))
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
        const maybeContexts = context.workflows.now(context, context.states.now.get(), request)
        const proms = this._runExecutor(maybeContexts, request, false)
        const results = []
        for (const prom of proms) {
            prom.then(this._afterCallbackMode)
            results.push(prom)

        }
        return results



    }
    /**
     * 
     * @param {import("./protocol").StepResult} stepresult 
     */
    _afterCallbackMode(stepresult) {
        if (stepresult === false) {
            return stepresult
        }
        if (stepresult.states.controll.getExecuteMode() === 'callback') {

            stepresult.states.controll.setExecuteMode('go')


        }
        return stepresult


    }



    /**
     * 
     * @param {import("../states/protocol").Context} context
     * @param {any} request
    */

    back(context, request) {


    }
    rewindWorkflow() {



    }
    rewindReturn() {


    }
    /**
     * 
     * @param {import("../../protocol").MaybeContexts} contexts 
     * @param {*} request 
     * @param {*} defaultCallback 
     * @returns 
     */
    _runExecutor(contexts, request, defaultCallback = null, isEnsured = false) {
        /**
         * @type {Promise<import("./protocol").StepResult>[]}
         */
        const proms = []
        /**
         * @type {import("../../protocol/index").Contexts}
         */
        // @ts-ignore
        const _contexts = isEnsured === true ? contexts : ensureArray(contexts)

        // @ts-ignore
        for (const context of _contexts) {

            const _callback = context.states.controll.getCallback() || defaultCallback

            const prom = this._call(context, _callback, request)
            proms.push(prom)

        }
        return proms
    }
    /**
     * @param {import("../../protocol").Context} context
     * @param {string} callback
     * @param {any} request
     *
     * @returns {Promise<import("./protocol").StepResult>}
     */
    async _call(context, callback, request) {

        const { options, executor } = context.resolver.resolveGetExecutorWithConfigure()

        // @ts-ignore
        await executor[callback].call(executor, context, request, options)
        return context

    }


}

module.exports = { SequenceDispatcherBase }








