



/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得
 * @property {function(Object): Function} getSubworkflow - サブワークフローに入る
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻る
 * @property {function(Object): Function} back - 前の状態に戻る
 */

const { Bords } = require("./bords/bords.cjs");
const { Histories } = require("./histories.cjs");
const { Repositries } = require("./repositries.cjs");
const { States } = require("./states/states.cjs");
const { Workflows } = require("./workflows.cjs");






/**
 * @typedef {{branch?:{
 *      bord:any,
 *      state:any
 * }}} BranchState
 */

/**
 * @typedef {{
 *      bords:typeof Bords,
 *      repositries:typeof Repositries,
 *      states: typeof States,
 *      workflows: typeof Workflows,
 *      histories: typeof Histories  
 * }} ContextClasses
 */
/**
 * @type {ContextClasses}
 */
const DEFUALT_CLASSES = {
    bords: Bords,
    repositries: Repositries,
    states: States,
    workflows: Workflows,
    histories: Histories


}
/**
 * @typedef {Partial<{
 *   states:any,
 *   repositries:any, 
 *   bords:any, 
 *   workflows:any,
 *   histories:any, 
 *   functions:any}> | false} ContextInit
 */


class Context {
    /**
     * @type {States}
     */
    states

    /**
     * @type {Repositries}
     */
    repositries

    /**
     * @type {Bords}
     */
    bords
    /**
     * @type {Workflows}
     */
    workflows

    /**
     * @type {Histories}
     */
    histories


    /**
     * @param {ContextInit?} [initData] 
     * @param {ContextClasses} classes 
     */
    constructor(initData, classes = DEFUALT_CLASSES) {
        if (initData === false) {
            return
        }
        const _initData = initData || {}

        /**
         * @type {{[k in string]:Function}}
         */
        this.functions = _initData.functions || {}


        this.repositries = new classes.repositries(_initData.repositries)

        this.bords = new classes.bords(_initData.bords)


        this.states = new classes.states(_initData.states)
        const workflowsInit = Object.assign({ state: this.states, repositries: this.repositries }, _initData.workflows || {})
        /**
         * @type {Workflows}
         */
        this.workflows = new classes.workflows(workflowsInit)

        /**
         * @type {Histories}
         */
        this.histories = new classes.histories({ states: this.states, bords: this.bords }, initData.histories)


    }
    /**
     * 
     * @param {*} state
     * @param {*} request  
     */
    forward(state, request) {

        const branch = { state: this.states.getBranchId(), bord: this.bords.getBranchId() }
        /**
        * @type {BranchState}
        */
        const _state = Object.assign({ branch }, state);
        this.states.update(_state)
        this.histories.request.forward(request, this.states.getBranchDepth())




    }
    goSub() {

        this.bords.push({})
        this.states.push({})
        this.histories.


            this.workflows.goSub()

    }
    endSub() {
        this.bords.pop()
        this.states.pop()

    }
    reset() {
        this.bords.update()


    }
    split(splitCount) {
        const bords_array = this.bords.splitTree(splitCount)
        const states_array = this.states.splitTree(splitCount)
        let index = 0;
        const results = [];
        while (index < splitCount) {
            const bords = bords_array[index]
            const states = states_array[index]
            const result = Object.assign({}, this)
            result.bords = bords
            result.states = states
            results.push(result)

        }
        return results;



    }
    initRoot(rootFlow = '', psuedoCalleId = '') {
        // wip
    }




}


module.exports = { Context }