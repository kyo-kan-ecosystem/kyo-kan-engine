import { ensureArray } from "../util/ensure_array.cjs";

const { AbstractDispatcher } = require("./protocol.class.cjs");


class DataResolver {
    /**
     * @type {Function}
     */
    _resolveFunction
    /**
     * @param {any} data
     */
    constructor(data) {
        this.data = data
        this.resolver = this.resolver.bind(this)

    }
    genaratePromise() {
        return new Promise(this.applyResolver)
    }
    /**
     * @param {Function} resolveFunction
     */
    applyResolver(resolveFunction) {
        this._resolveFunction = resolveFunction

    }
    resolver() {
        this._resolveFunction(this.data)


    }
}

class SequenceDispatcherBase extends AbstractDispatcher {
    /**
     * @type {typeof DataResolver}
     */
    _dataResolverClass

    constructor(resolverClass = DataResolver) {
        super()
        this._dataResolverClass = resolverClass

    }

    /**
   * 
   * @param {*} request 
   * @param {import("../controller/protocol").Context<any,any>} context 
   * @returns {Promise<import("./protocol").ModeAndContext>[]}
   * 
   */
    enter(request, context) {

        const workflowSteps = context.workflows.now()



        const defaultCallback = context.repositries.configures.engine.get('executor').enterFunc




        return this._runExecutor(workflowSteps, request, defaultCallback)




    }

    /**
     * 
     * @param {*} request 
     * @param {import("../controller/protocol").Context<any, any>} context 
     * @returns {Promise<import("./protocol").ModeAndContext>[]}
     * 
    */
    wait(request, context) {
        context.histories.forword(request)


        return [new Promise(this._falseResolve)]
    }
    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").ModeAndContext>[]}
    * 
   */
    end(request, context) {
        context.histories.forword(request)

        return [new Promise(this._falseResolve)]

    }

    /**
    * 
    * @param {*} request 
    * @param {import("../controller/protocol").Context<any, any>} context 
    * @returns {Promise<import("./protocol").ModeAndContext>[]}
    * 
   */
    go(request, context) {
        context.histories.forword(request)
        const proms = []
        /**
         * @type { import("../workflow/plugin/protocol").WorkflowSteps }
         */
        const workflowSteps = ensureArray(context.workflows.go())
        const _workflowSteps = ensureArray(workflowSteps)
        const resolver = new DataResolver(workflowSteps)
        proms.push(resolver.genaratePromise())
        for (const workflowStep of workflowSteps) {
            if (workflowStep === false) {
                if (context.isRoot() === false) {
                    const state = context.states.get()
                    state.mode = 'returnFromSub'
                    context.states.update(state)



                }
                else {
                    proms.push(new Promise(this._falseResolve))
                }
                continue


            }
            if (workflowStep.context.context.states.get().mode !== 'go') {

                const resolver = new this._dataResolverClass(workflowStep)
                proms.push(resolver.genaratePromise())
                continue


            }
            _workflowSteps.push(workflowStep)

        }
        return proms.concat(this._runExecutor(_workflowSteps, request, null, true))

    }
    /**
     * 
     * @param {import("../controller/protocol").Context<any,any>} context 
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
     * @param {*} defaultCallback 
     * @returns 
     */
    _runExecutor(workflowSteps, request, defaultCallback = null, isEnsured = false) {
        /**
         * @type {Promise<import("./protocol").ModeAndContext>[]}
         */
        const proms = []

        /**
         * @type {import("../workflow/plugin/protocol").WorkflowSteps}
         */
        // @ts-ignore
        const _workflowSteps = isEnsured === true ? workflowSteps : ensureArray(workflowSteps)
        for (const workflowStep of _workflowSteps) {
            if (workflowStep === false) {
                proms.push(new Promise(this._falseResolve))
                continue
            }
            const _callback = workflowStep.callback || defaultCallback

            const prom = this._call(workflowStep.executor, _callback, request, workflowStep.context)
            proms.push(prom)

        }
        return proms
    }
    /**
     * @param {{[k in string]:import("../../protocol/executor/protocol").ExecutorFunction}} plugin
     * @param {string} callback
     * @param {any} request
     * @param {import("../context/index.cjs").Context<any, any>} context
     * @returns {Promise<import("./protocol").ModeAndContext>}
     */
    async _call(plugin, callback, request, context) {
        await plugin[callback].call(plugin, request, context)
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








