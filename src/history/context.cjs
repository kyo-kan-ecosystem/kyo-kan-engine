const { RequestHistory } = require('./request.cjs');
const { StateHistory } = require('./state.cjs');
const { BordGlobalHistory } = require('./bords/global.cjs');
const { BordCurrentWorkflowHistory } = require('./bords/current_workflow.cjs');
const { BordSubWorkflowHistory } = require('./bords/sub_workflow.cjs');

/**
 * @typedef {{state:any, request:any, bords:{global:any, currentWorkflow:any, subWorkflow:any}}} BranchIdMapType
 */

/**
 * @typedef {{
 *    state:typeof StateHistory, 
 *    request:typeof RequestHistory, 
 *    bords:{
 *          global: typeof BordGlobalHistory, 
 *          subWorkflow: typeof BordSubWorkflowHistory, 
 *          currentWorkflow: typeof BordCurrentWorkflowHistory
 *    }}} HistoryClasses
 */
const DEFAULT_HISTORY_CLASSES = {
    state: StateHistory,
    request: RequestHistory,

    bords: {
        global: BordGlobalHistory,
        subWorkflow: BordSubWorkflowHistory,
        currentWorkflow: BordCurrentWorkflowHistory
    }
}
/**
 * @typedef {{n:number}} CountRef
 */
/**
 * @typedef {{
 *      state?:any, 
 *      request?:any, 
 *      bords?:{global:any, subWorkflow:any, currentWorkflow:any},
 *      countRef?:CountRef
 * }} HistoryInits
 */


/**
 * @typedef {Required<HistoryInits>} HistoryInheritance
 */
/**
 * @typedef {import('../states/states.cjs').StatesType} States 
 * @typedef {import("../bords/bords.cjs").Bords} Bords 
 */
class HistoriesContext {


    /**
     * @type {StateHistory}
     * 
     */
    // @ts-ignore
    state

    /**
     * @type {RequestHistory}
     */
    // @ts-ignore
    request

    /**
     * @type {{global:BordGlobalHistory, currentWorkflow:BordCurrentWorkflowHistory, subWorkflow:BordSubWorkflowHistory}}
     */
    // @ts-ignore
    bords



    /**
     * @type {import('../states/states.cjs').StatesType}
     * 
     */
    _statesTree

    /**
     * @type {import('../bords/bords.cjs').Bords}
     */
    _bordsTree


    /**
     * @type {CountRef}
     */
    _countRef

    /**
     * @type {HistoryClasses}
     */
    _historyClasses

    /**
     * 
     * @param {import('../context/protocol').StackTrees} stackTrees  
     * @param {HistoryInits?} historyInit
     * @param {HistoryInheritance?} historyInheritance 
     * @param {HistoryClasses?} historyClasses  
     */
    constructor(stackTrees, historyInit = null, historyInheritance = null, historyClasses = null) {
        this._statesTree = stackTrees.states
        this._bordsTree = stackTrees.bords
        this._historyClasses = historyClasses || DEFAULT_HISTORY_CLASSES

        if (historyInheritance != null) {
            this.state = historyInheritance.state
            this.request = historyInheritance.request
            this.bords = historyInheritance.bords
            this._countRef = historyInheritance.countRef
            return

        }


        const _historyClasses = historyClasses || DEFAULT_HISTORY_CLASSES
        this.state = new _historyClasses.state(historyInit?.state)
        this.request = new _historyClasses.request(historyInit?.request)
        this._countRef = { n: 0 }

        this.bords = {
            global: new _historyClasses.bords.global(historyInit?.bords?.global),
            currentWorkflow: new _historyClasses.bords.currentWorkflow(historyInit?.bords?.currentWorkflow),
            subWorkflow: new _historyClasses.bords.subWorkflow(historyInit?.bords?.subWorkflow)
        }








    }
    /**
     * 
     * @param {*} request 
     * 
     */
    forword(request) {
        this.request.forward(request, this._statesTree.getBranchDepth())

        this.state.forward(this._statesTree.getStack().get(), this._statesTree.getBranchDepth())
        this.bords.global.forward(this._bordsTree.getGlobal(), this._bordsTree.getBranchDepth())
        this.bords.currentWorkflow.forward(this._bordsTree.getCurrentWorkflow(), this._bordsTree.getBranchDepth())
        this.bords.subWorkflow.forward(this._bordsTree.getSubWorkflow(), this._bordsTree.getBranchDepth())



    }

    rewindWorkflow() {
        if (this.state.isEmpty()) {
            return false
        }
        const targetDepth = this._statesTree.getBranchDepth() - 1
        if (targetDepth < 0 || this.state.isEmpty() === false) {
            return false
        }
        // @ts-ignore
        while (this.state.getBranchHead()?.depth > targetDepth && this.state.isEmpty() === false) {
            this._backOneStep()

        }
        this._applyHistoryToTrees
        /**
         * @type {{log?:{mode:import('../sequence/protocol').ExecuteMode}, depth?:number}}
         */
        const headState = this.state.getBranchHead() || {}
        if (headState.log?.mode === 'wait') {

            return { request: this.request.getBranchHead()?.log, }
        }
        return this.back()

    }


    _backOneStep() {
        this.state.back();
        this.request.back();

        this.bords.global.back();
        this.bords.currentWorkflow.back();
        this.bords.subWorkflow.back();
    }

    _applyHistoryToTrees() {
        const headState = this.state.getBranchHead() || {};
        // @ts-ignore
        if (headState.depth < this._statesTree.getBranchDepth()) {
            this._statesTree.pop()
        }

        // @ts-ignore
        if (headState.depth > this._statesTree.getBranchDepth()) {
            // @ts-ignore
            this._statesTree.now.push(headState.log)
        }
        else {
            // @ts-ignore
            this._statesTree.now.update(headState.log)
        }

        const headGlobal = this.bords.global.getBranchHead()
        const headCurrentWorkflow = this.bords.currentWorkflow.getBranchHead()
        const headSubWorkflow = this.bords.subWorkflow.getBranchHead()
        // @ts-ignore
        if (headCurrentWorkflow.depth < this._bordsTree.getBranchDepth()) {
            this._bordsTree.pop()
        }
        // @ts-ignore
        if (headCurrentWorkflow.depth > this._bordsTree.getBranchDepth()) {
            // @ts-ignore
            this._bordsTree.now.push(headCurrentWorkflow.log)
        }
        else {
            // @ts-ignore
            this._bordsTree.updateGlobal(headGlobal.log)
            // @ts-ignore
            this._bordsTree.updateCurrentExecutorBord(headCurrentWorkflow.log, true)
            // @ts-ignore
            this._bordsTree.setSubWorkFlow(headSubWorkflow.log)
        }


    }

    back() {
        if (this.state.isEmpty()) {
            return false;
        }

        while (this.state.isEmpty() === false) {
            this._backOneStep();
            this._applyHistoryToTrees();

            const headState = this.state.getBranchHead();
            // @ts-ignore
            if (headState.log.mode === 'wait') {
                // @ts-ignore
                return { request: this.request.getBranchHead().log };
            }
        }
        return false;
    }


    /**
     * @param {{state?:any, request?:any, bords?:{global?:any, currentWorkflow?:any,subWorkflow?:any}}?} ids 
     * @param {import('../context/protocol').StackTrees?} stackTrees
     * @param {null | true | number} [step=null]  
     * @returns {this}
     */
    fork(ids = null, stackTrees = null, step = null) {

        const _ids = ids || {}
        /**
         * @type {import('../context/protocol').StackTrees}
         */
        const _stackTrees = stackTrees || { bords: this._bordsTree, states: this._statesTree }



        /**
         * @type {HistoryInheritance}
         */
        const inheritance = {
            state: this.state.fork(_ids.state, step),
            request: this.request.fork(_ids.request, step),
            bords: {
                global: this.bords.global.fork(_ids.bords?.global, step),
                currentWorkflow: this.bords.currentWorkflow.fork(_ids.bords?.currentWorkflow, step),
                subWorkflow: this.bords.subWorkflow.fork(_ids.bords?.subWorkflow, step)
            },
            countRef: this._countRef
        }
        /**
         * @type {this}
         */
        // @ts-ignore
        const newHistories = new this.constructor(_stackTrees, null, inheritance, this._historyClasses)


        return newHistories

    }
    /**
     * 
     * @param {BranchIdMapType} branchIdMap 
     */
    setBranchId(branchIdMap) {
        this.state.setBranchId(branchIdMap.state)
        this.request.setBranchId(branchIdMap.request)

        this.bords.global.setBranchId(branchIdMap.bords)
        this.bords.currentWorkflow.setBranchId(branchIdMap.bords.currentWorkflow)
        this.bords.subWorkflow.setBranchId(branchIdMap.bords.subWorkflow)

    }

    getBranchId() {
        const historyIds = {
            state: this.state.getBranchId(),
            request: this.request.getBranchId(),

            bords: {
                global: this.bords.global.getBranchId(),
                currentWorkflow: this.bords.currentWorkflow.getBranchId(),
                subWorkflow: this.bords.subWorkflow.getBranchId()
            }
        }
        return historyIds
    }
    /**
     * 
     * @returns {{state:any, request:any,  bords:{global:any, currentWorkflow:any, subWorkflow:any}}}
     */
    getSerializableData() {
        return {
            state: this.state.getReferenceData(),
            request: this.request.getReferenceData(),

            bords: {
                global: this.bords.global.getReferenceData(),
                currentWorkflow: this.bords.currentWorkflow.getReferenceData(),
                subWorkflow: this.bords.subWorkflow.getReferenceData()
            }
        }

    }
}
module.exports = { HistoriesContext }