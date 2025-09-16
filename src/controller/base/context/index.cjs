



/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得
 * @property {function(Object): Function} getSubworkflow - サブワークフローに入る
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻る
 * @property {function(Object): Function} back - 前の状態に戻る
 */

const { Bords } = require("./bords/bords.cjs");
const { Repositries } = require("./repositries");
const { States } = require("./state/states.cjs");
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
 * }} Classes
 */
/**
 * @type {Classes}
 */
const DEFUALT_CLASSES = {
    bords: Bords,
    repositries: Repositries,
    states: States,
    workflows: Workflows


}
/**
 * @typedef {{repositries:any, bords:any, repositries:any, workflows:any, functions?:any}} ContextInit
 */

/**
 * @template Functions
 */
class Context {
    /**
     * @param {ContextInit} [initData={}] 
     * @param {Classes} classes 
     */
    constructor(initData = {}, classes = DEFUALT_CLASSES) {
        this.innerSession = ''

        /**
         * @type {Functions}
         */
        this.functions = initData.functions || {}

        /**
         * @type {Repositries}
         */
        this.repositries = new classes.repositries(initData.repositries)
        /**
         * @type {Bords}
         */
        this.bords = new classes.bords(initData.bords)
        /**
         * @type {States}
         */
        this.states = new classes.states(initData.states)
        const workflowsInit = Object.assign({ state: this.states, repositries: this.repositries }, initData.workflows || {})
        /**
         * @type {Workflows}
         */
        this.workflows = new classes.workflows(workflowsInit)


    }
    /**
     * 
     * @param {*} state 
     */
    forward(state) {
        /**
         * @type {BranchState}
         */
        const branch = { state: this.states.}
        const _state = Object


    }
    goSub() {

        this.bords.push({})
        this.states.push({})


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