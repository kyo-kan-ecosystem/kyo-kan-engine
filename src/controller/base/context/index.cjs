




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
 *
 * @template  {import("./protocol").MaybeForkType} ReporterType, 
 * @template  {}ContextFunctionsType
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
     * @type {Object<any, {bords:any, histories:any, states:any}>}
     */
    branches

    /**
     * @type {number}
     */
    _branchId

    /**
     * @type {ContextFunctionsType}
     */
    functions

    /**
     * @type {ReporterType}
     */
    reporter

    /**
     * @type {{n:number}}
     */
    _countRef

    /**
     * @param {Object} param0 
     * @param {import("./protocol").ContextInit<ContextFunctionsType, ReporterType> | false| null} [param0.initParams] 
     * @param {ContextClasses} [param0.classes] 
     * @param {import("./protocol").ContextInheritance?} [param0.inheritance] 
     */
    constructor({ initParams = null, inheritance = null, classes = DEFUALT_CLASSES }) {
        if (initParams === false) {
            this.functions = inheritance.functions
            this.repositries = inheritance.repositries
            this.bords = inheritance.bords
            this.states = inheritance.states
            this.workflows = inheritance.workflows
            this.histories = inheritance.histories
            this.branches = inheritance.branches
            this.reporter = inheritance.reporter
            this._countRef = inheritance._countRef

            return
        }
        const initData = initParams?.data || {}

        this.functions = initParams?.api?.functions
        this.reporter = initParams?.api?.reporter


        this.repositries = new classes.repositries(initData.repositries)


        this.bords = new classes.bords(initData.bords)


        this.states = new classes.states(initData.states)
        const workflowsInit = Object.assign({ state: this.states, repositries: this.repositries }, initData.workflows || {})
        /**
         * @type {Workflows}
         */
        this.workflows = new classes.workflows(workflowsInit)

        /**
         * @type {Histories}
         */
        this.histories = new classes.histories({ states: this.states, bords: this.bords }, initData.histories)
        this.branches = initData.branches || {}

        this.reporter = initData.reporter
        this._countRef = initData._countRef || { n: 0 };
        this._branchId = 0;
        if (initParams === null) {
            this._branchId = this._createIdMap()

        }








    }
    /**
     * @returns {import("./protocol").ContextSerialiableData}
     */
    getSerialiableData() {
        return {
            bords: this.bords.getSerializableData(),
            states: this.states.getSerializableData(),
            histories: this.histories.getSerializableData(),

        }

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


        this.states.goSub()


        this.bords.push()


        this.workflows.goSub()

    }
    returnFromSubworkflow(request) {

        this.bords.pop()
        this.states.pop()

    }
    reset() {
        this.bords.update()


    }
    /**
     * 
     * @param {string} name 
     */
    forkAsNamedTree(name) {
        const bords = this.bords.forkAsNamedTree(name)


        return this._fork(null, null, bords)
    }
    /**
     * 
     * @param {*} id 
     * 
     */
    fork(id) {
        if (typeof id != 'undefined' && id in this.branches === false) {
            throw new Error(`branch id ${id} is not found`);


        }
        const branch = this.branches[id]

        const bords = this.bords.fork(branch?.bords)
        return this._fork(id, branch, bords)


    }
    _fork(id, branch, bords) {


        const states = this.states.fork(branch?.state)
        const histories = this.histories.fork(branch?.histories)
        let _id = id
        if (typeof id === 'undefined') {
            _id = this._createIdMap({ bords, states, histories })


        }

        /**
        * @type {import("./protocol").ContextInheritance}
        */
        const inheritance = {
            bords,
            states,
            histories,
            _countRef: this._countRef,
            branches: this.branches,
            functions: this.functions,
            reporter: this.reporter,
            repositries: this.repositries,
            workflows: this.workflows,
            id: _id
        }

        /**
         * @type {this}
         */
        // @ts-ignore
        const forked = new this.constructor({ inheritance })




        return forked



    }
    /**
     * @param {Object} param0
     * @param {Bords?} [param0.bords] 
     * @param {States?} [param0.states] 
     * @param {Histories?} [param0.histories] 
     * @returns 
     */
    _createIdMap({ bords = null, states = null, histories = null } = {}) {
        const _bords = bords || this.bords
        const _states = states || this.states
        const _histories = histories || this.histories
        const idMap = { bords: _bords.getBranchId(), states: _states.getBranchId(), histories: _histories.getBranchId() }
        const id = this._countRef.n
        this.branches[this._countRef.n] = idMap
        this._countRef.n += 1

        return id
    }







    initRoot(rootFlow = '', psuedoCalleId = '') {
        // wip
    }




}



module.exports = { Context }