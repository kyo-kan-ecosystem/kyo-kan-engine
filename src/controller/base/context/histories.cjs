const { RequestHistory } = require('../../../history/request.cjs');
const { StateHistory } = require('../../../history/state.cjs');
const { BordGlobalHistory } = require('../../../history/bords/global.cjs');
const { BordCurrentWorkflowHistory } = require('../../../history/bords/current_workflow.cjs');
const { BordSubWorkflowHistory } = require('../../../history/bords/sub_workflow.cjs');
const { ResponseHistory } = require('../../../history/response.cjs');


/**
 * @typedef {{
 *    state:typeof StateHistory, 
 *    request:typeof RequestHistory, 
 *    response: typeof ResponseHistory, 
 *    bords:{
 *          global: typeof BordGlobalHistory, 
 *          subWorkflow: typeof BordSubWorkflowHistory, 
 *          currentWorkflow: typeof BordCurrentWorkflowHistory
 *    }}} HistoryClasses
 */
const DEFAULT_HISTORY_CLASSES = {
    state: StateHistory,
    request: RequestHistory,
    response: ResponseHistory,
    bords: {
        global: BordGlobalHistory,
        subWorkflow: BordSubWorkflowHistory,
        currentWorkflow: BordCurrentWorkflowHistory
    }
}

/**
 * @typedef {{state?:any, request?:any, response?:any, bords?:{global?:any, subWorkflow?:any, currentWorkflow:any}}} HistoryInit
 */


/**
 * @typedef {import('./states/states.cjs').States} States 
 * @typedef {import("./bords/bords.cjs").Bords} Bords 
 */
// @ts-ignore
class Histories {


    /**
     * @type {StateHistory}
     * 
     */
    state

    /**
     * @type {RequestHistory}
     */
    request

    /**
     * @type {{global:BordGlobalHistory, currentWorkflow:BordCurrentWorkflowHistory, subWorkflow:BordSubWorkflowHistory}}
     */
    bords

    /**
     * @type {ResponseHistory}
     */

    response

    /**
     * @type {import('./states/states.cjs').States}
     * 
     */
    _statesTree

    /**
     * @type {import('./bords/bords.cjs').Bords}
     */
    _bordsTree

    /**
     * 
     * @param {import('./protocol').StackTrees} stackTrees 
     * @param {HistoryInit | false | null} historyInit
     * @param {HistoryClasses?} historyClasses  
     */
    constructor(stackTrees, historyInit = null, historyClasses = null) {
        this._statesTree = stackTrees.states;
        this._bordsTree = stackTrees.bords;
        if (historyInit === false) {
            return

        }
        const _historyInit = historyInit || {}
        const _historyClasses = historyClasses || DEFAULT_HISTORY_CLASSES
        this.state = new _historyClasses.state(_historyInit.state)
        this.request = new _historyClasses.request(_historyInit.request)
        this.response = new _historyClasses.response(_historyInit.response)
        this.bords = {
            global: new _historyClasses.bords.global(_historyInit.bords?.global),
            currentWorkflow: new _historyClasses.bords.currentWorkflow(_historyInit.bords?.currentWorkflow),
            subWorkflow: new _historyClasses.bords.subWorkflow(_historyInit.bords?.subWorkflow)
        }








    }
    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    record(request, response) {
        this.request.forward(request, this._statesTree.getBranchDepth())
        this.response.forward(response, this._statesTree.getBranchDepth())
        this.state.forward(this._statesTree.getStack().get(), this._statesTree.getBranchDepth())
        this.bords.global.forward(this._bordsTree.getGlobal(), this._bordsTree.getBranchDepth())
        this.bords.currentWorkflow.forward(this._bordsTree.getCurrentWorkflow(), this._bordsTree.getBranchDepth())
        this.bords.subWorkflow.forward(this._bordsTree.getSubWorkflow(), this._bordsTree.getBranchDepth())



    }
    /**
     * 
     * @returns {{request:any, response:any} | false}
     */
    rewindBack() {
        if (this.state.isEmpty()) {
            return false
        }
        const targetDepth = this._statesTree.getBranchDepth() - 1
        if (targetDepth < 0 || this.state.isEmpty() === false) {
            return false
        }
        while (this.state.getBranchHead().depth > targetDepth && this.state.isEmpty() === false) {
            this.state.back()
            this.request.back()
            this.response.back()
            this.bords.global.back()
            this.bords.currentWorkflow.back()
            this.bords.subWorkflow.back()


        }
        this._statesTree.pop()
        this._bordsTree.pop()
        this._bordsTree.updateGlobal(this.bords.global.getBranchHead().log)
        this._bordsTree.updateCurrentWorkflow(this.bords.currentWorkflow.getBranchHead().log, true)
        this._bordsTree.setSubWorkFlow(this.bords.subWorkflow.getBranchHead().log)
        this._statesTree.update(this.state.getBranchHead().log)
        /**
         * @type {{log:{mode:import('../../protocol').executeMode}, depth:number}}
         */
        const headState = this.state.getBranchHead()
        if (headState.log.mode === 'wait') {

            return { request: this.request.getBranchHead().log, response: this.response.getBranchHead().log }
        }
        return this.back()

    }
    back() {
        if (this.state.isEmpty()) {
            return false
        }

        while (this.state.isEmpty() === false) {
            this.state.back()
            this.request.back()
            this.response.back()
            this.bords.global.back()
            this.bords.currentWorkflow.back()
            this.bords.subWorkflow.back()

            /**
             * @type {{log:{mode:import('../../protocol').executeMode}, depth:number}}
             */
            const headState = this.state.getBranchHead()
            if (headState.depth < this._statesTree.getBranchDepth()) {
                this._statesTree.pop()

            }
            this._statesTree.update(headState.log)
            const headGlobal = this.bords.global.getBranchHead()
            const headCurrentWorkflow = this.bords.currentWorkflow.getBranchHead()
            const headSubWorkflow = this.bords.subWorkflow.getBranchHead()
            if (headCurrentWorkflow.depth < this._bordsTree.getBranchDepth()) {
                this._bordsTree.pop()
            }
            this._bordsTree.updateGlobal(headGlobal.log)
            this._bordsTree.updateCurrentWorkflow(headCurrentWorkflow.log, true)
            this._bordsTree.setSubWorkFlow(headSubWorkflow.log)
            if (headState.log.mode === 'wait') {
                return { request: this.request.getBranchHead().log, response: this.response.getBranchHead().log }
            }






        }
        return false

    }
    /**
     * 
     * @param {import('./protocol').StackTrees} stackTrees 
     * @param {*} id 
     */
    fork(stackTrees, id) {
        /**
         * @type {Histories}
         */
        // @ts-ignore
        const newHistories = new this.constructor(stackTrees, false)
        /**
         * @type {{state:any, bords:{global:any, currentWorkflow:any, subWorkflow:any}}}
         */
        const histories = {
            state: this.state.fork(id),
            bords: {
                global: this.bords.global.fork(id),
                currentWorkflow: this.bords.currentWorkflow.fork(id),
                subWorkflow: this.bords.subWorkflow.fork(id)
            }
        }

        const historyIds = {
            state: this.state.getBranchId(),
            bords: {
                global: this.bords.global.getBranchId(),
                currentWorkflow: this.bords.currentWorkflow.getBranchId(),
                subWorkflow: this.bords.subWorkflow.getBranchId()
            }
        }

        newHistories.setHistories(histories)
        return { newHistories, ids: historyIds }

    }
    /**
     * 
     * @param {{state:any, bords:{global:any, currentWorkflow:any, subWorkflow:any}}} histories 
     */
    setHistories(histories) {
        this.state = histories.state
        this.bords.global = histories.bords.global
        this.bords.currentWorkflow = histories.bords.currentWorkflow
        this.bords.subWorkflow = histories.bords.subWorkflow

    }

}

module.exports = { Histories }