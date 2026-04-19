






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
 * @template  {import("./protocol").MaybeForkType} ReporterType
 * @template  {import("./protocol").MaybeForkTypeMap} ContextFunctionsType
 */
class Context {
    /**
     * @type {import("./states/states.cjs").StatesType}
     */
    states

    /**
     * @type {Repositries}
     */
    // @ts-ignore
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
    _branches

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
     * @type {Object<any, any>}
     */
    _linkMap

    /**
     * @type {ContextClasses}
     */
    _classes


    /**
     * @param {Object} param0 
     * @param {import("./protocol").ContextSerializableData | false| null} [param0.datas] 
     * @param {import("./protocol").ContextApi?} [param0.api]
     * @param {ContextClasses} [param0.classes] 
     * @param {import("./protocol").ContextInheritance?} [param0.inheritance] 
     */
    constructor({ datas = null, api = null, inheritance = null, classes = DEFUALT_CLASSES }) {
        this._classes = classes

        if (datas === false) {

            this.bords = inheritance?.bords
            this.states = inheritance?.states

            this.histories = inheritance?.histories
            this._branches = inheritance?.branches
            this.reporter = inheritance?.reporter
            this._countRef = inheritance?._countRef
            this._branchId = inheritance?.branchId || 0
            this._linkMap = inheritance?._linkMap

            const { functions, reporter } = this._forkApi(inheritance?.reporter, inheritance?.functions)
            this.functions = functions
            this.reporter = reporter
            this.workflows = this._constructWorkflows(inheritance?.workflows)
            return
        }


        const { functions, reporter } = this._forkApi(api?.reporter, api?.functions)
        this.functions = functions
        this.reporter = reporter


        this.repositries = new classes.repositries(datas?.repositries)


        this.bords = new classes.bords(datas?.bords)


        this.states = new classes.states(datas?.states)

        this.workflows = this._constructWorkflows(datas?.workflows)

        /**
         * @type {Histories}
         */
        this.histories = new classes.histories({ states: this.states, bords: this.bords }, datas?.histories)
        this._branches = datas?.branches || {}


        this._countRef = datas?._countRef || { n: 0 };
        this._linkMap = datas?._linkMap || {}

        if (datas === null) {
            this._branchId = this._createIdMap()
            this.states.now.push({})



        }
        else {
            this._branchId = 0

        }








    }
    /**
     * 
     * @param {*} datas 
     * @param {*} context 
     * @returns 
     */
    _constructWorkflows(datas = null, context = null) {
        /**
         * @type {ConstructorParameters<typeof Workflows>[0]}
         */
        const workflowsInit = Object.assign({ state: this.states, repositries: this.repositries, context: context || this }, datas || {})
        /**
         * @type {Workflows}
         */
        return new this._classes.workflows(workflowsInit)
    }


    /**
     * @returns {import("./protocol").ContextSerializableData}
     */
    getSerialiableData() {
        return {
            bords: this.bords.getSerializableData(),
            states: this.states.getSerializableData(),
            histories: this.histories.getSerializableData(),

        }

    }

    isRoot() {
        return this.states.isRoot()

    }
    isEmptyNow() {
        return this.states.isEmptyNow()

    }




    returnFromSub() {

        this.bords.pop()
        this.states.pop()
        const nowBranch = this._branches[this._branchId]

        if (this.bords.getBranchId() !== nowBranch.bords || this.states.getBranchId() !== nowBranch.states) {
            const linkedBranchId = this._linkMap[this._branchId]
            this.setBranchId(linkedBranchId)
            this.histories.setBranchId(this._branches[this._branchId].histories)


        }

    }
    /**
     * 
     * @param {*} branchId 
     */
    setBranchId(branchId) {
        this._branchId = branchId
    }

    getBranchId() {
        return this._branchId
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
        if (typeof id != 'undefined' && id in this._branches === false) {
            throw new Error(`branch id ${id} is not found`);


        }
        const branch = this._branches[id]

        const bords = this.bords.fork(branch?.bords)
        return this._fork(id, branch, bords)


    }

    /**
     * @param {any} id
     * @param {{ state: number | null | undefined; histories: { state?: any; request?: any; bords?: { global?: any; currentWorkflow?: any; subWorkflow?: any; }; } | null | undefined; } | null} branchIds
     * @param {null| true | number} step     * 
     * @param {Bords} bords
     */
    _fork(id, branchIds, bords, step = null) {


        const states = this.states.fork(branchIds?.state)
        const histories = this.histories.fork(branchIds?.histories, { states, bords }, step)

        let branchId = id
        if (id === null || typeof id === 'undefined') {
            branchId = this._createIdMap({ bords, states, histories })
            this._linkMap[branchId] = this._branchId



        }


        /**
        * @type {import("./protocol").ContextInheritance}
        */
        const inheritance = {
            bords,
            states,
            histories,
            _countRef: this._countRef,
            branches: this._branches,
            functions: this.functions,
            reporter: this.reporter,
            repositries: this.repositries,
            workflows: this.workflows,
            _linkMap: this._linkMap,
            branchId
        }

        /**
         * @type {this}
         */
        // @ts-ignore
        const forked = new this.constructor({ inheritance })




        return forked



    }
    /**
     * 
     * @param {import("./protocol").MaybeForkType?} reporter 
     * @param {import("./protocol").MaybeForkTypeMap?} functions
     * @returns {{functions:any, reporter:any}} 
     */
    _forkApi(reporter, functions) {
        const forkedFunctions = {}

        for (const key in Object.keys(functions || {})) {
            // @ts-ignore
            const functionObj = functions[key] || {}
            if ('fork' in functionObj) {
                // @ts-ignore
                forkedFunctions[key] = functionObj.fork(this.getBranchId(), this)
                continue


            }
            // @ts-ignore
            forkedFunctions[key] = functionObj

        }
        let forkedReporter
        if (!!reporter && 'fork' in reporter) {
            // @ts-ignore
            forkedReporter = reporter.fork(this.getBranchId(), this)
        } else {
            forkedReporter = reporter
        }
        return {
            functions: forkedFunctions,
            reporter: forkedReporter
        }

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
        this._countRef.n += 1
        this._branches[id] = idMap
        this._linkMap[id] = this._branchId



        return id
    }







    initRoot(rootFlow = '', psuedoCalleId = '') {
        // wip
    }




}



module.exports = { Context }