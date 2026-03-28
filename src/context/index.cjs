






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
     * @type {ContextClasses}
     */
    _classes


    /**
     * @param {Object} param0 
     * @param {import("./protocol").ContextSerializableData | false| null} [param0.datas] 
     * @param {import("./protocol").ContextApi} [param0.api]
     * @param {ContextClasses} [param0.classes] 
     * @param {import("./protocol").ContextInheritance?} [param0.inheritance] 
     */
    constructor({ datas = null, api = null, inheritance = null, classes = DEFUALT_CLASSES }) {
        this._classes = classes

        if (datas === false) {

            this.bords = inheritance.bords
            this.states = inheritance.states

            this.histories = inheritance.histories
            this.branches = inheritance.branches
            this.reporter = inheritance.reporter
            this._countRef = inheritance._countRef
            this._branchId = inheritance.branchId
            const { functions, reporter } = this._forkApi(inheritance.reporter, inheritance.functions)
            this.functions = functions
            this.reporter = reporter
            this.workflows = this._constructWorkflows(inheritance.workflows)
            return
        }


        const { functions, reporter } = this._forkApi(api.reporter, api.functions)
        this.functions = functions
        this.reporter = reporter


        this.repositries = new classes.repositries(datas.repositries)


        this.bords = new classes.bords(datas.bords)


        this.states = new classes.states(datas.states)

        this.workflows = this._constructWorkflows(datas.workflows)

        /**
         * @type {Histories}
         */
        this.histories = new classes.histories({ states: this.states, bords: this.bords }, datas.histories)
        this.branches = datas.branches || {}


        this._countRef = datas._countRef || { n: 0 };

        if (datas === null) {
            this._branchId = this._createIdMap()
            this.states.push({})



        }
        else {
            this._branchId = 0

        }








    }
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
        let branchId = id
        if (typeof id === 'undefined') {
            branchId = this._createIdMap({ bords, states, histories })


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

        for (const key in functions || {}) {
            const functionObj = functions[key]
            if ('fork' in functionObj) {
                forkedFunctions[key] = functionObj.fork(this.getBranchId(), this)
                continue


            }
            forkedFunctions[key] = functionObj

        }
        let forkedReporter
        if (reporter !== null && 'fork' in reporter) {
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
        this.branches[this._countRef.n] = idMap
        this._countRef.n += 1

        return id
    }







    initRoot(rootFlow = '', psuedoCalleId = '') {
        // wip
    }




}



module.exports = { Context }