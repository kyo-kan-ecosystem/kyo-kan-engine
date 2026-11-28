const { ContextBridgeResolver } = require("../resolver/context/bridge_resolver.cjs")
const { BordsContext: Bords } = require("../bords/context.cjs")
const { HistoriesContext: Histories } = require("../history/context.cjs")
const { StatesContext } = require("../states/context.cjs")
const { WorkflowsContext } = require("../workflow/context.cjs")
const { ExecutorsContext } = require("../executor/context.cjs")
const { EngineContext } = require("../engine/context.cjs")
const { isVoid } = require("../util/is_void.cjs")







/**
 * @typedef {{
 *      bords:typeof Bords,
 *      engine:typeof EngineContext
 *      states: typeof StatesContext,
 *      workflows: typeof WorkflowsContext,
 *      histories: typeof Histories,
 *      executors: typeof ExecutorsContext,
 *      resolver: typeof ContextBridgeResolver   
 * }} ContextClasses
 */
/**
 * @type {ContextClasses}
 */
const DEFAULT_CLASSES = {
    bords: Bords,
    engine: EngineContext,
    states: StatesContext,
    workflows: WorkflowsContext,
    histories: Histories,
    executors: ExecutorsContext,
    resolver: ContextBridgeResolver


}



/**
 * @typedef {import("./protocol.js").ContextDataInterFace} ContextDataInterFace
 */


/**
 * 
 * @template  {import("./protocol.js").MaybeForkType} [ReporterType=any]
 * @template  {import("./protocol.js").MaybeForkTypeMap} [ContextFunctionsType=any]
 * @template  {ContextBridgeResolver}[ResolverType=ContextBridgeResolver]
 * @implements {ContextDataInterFace}
 */
class Context {
    /**
     * @type {StatesContext}
     */
    states


    /**
     * @type {Bords}
     */
    bords
    /**
     * @type {WorkflowsContext}
     */
    workflows

    /**
     * @type {ExecutorsContext}
     */
    executors

    /**
     * @type {Histories}
     */
    histories
    /**
     * @type {EngineContext}
     */
    engine
    /**
     * @type {{[k in any]:{bords:any, histories:any, states:any}}}
     */
    _branches

    /**
     * @type {number}
     */
    // @ts-ignore
    _branchId

    /**
     * @type {ContextFunctionsType}
     */
    // @ts-ignore
    functions

    /**
     * @type {ReporterType}
     */
    // @ts-ignore
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
     * @type {ResolverType}
     */
    resolver


    /**
     * @param {Object} param0 
     * @param {import("./protocol.js").ContextSerializableData | false| null} [param0.datas] 
     * @param {import("./protocol.js").ContextApi?} [param0.api]
     * @param {ContextClasses} [param0.classes] 
     * @param {import("./protocol.js").ContextInheritance?} [param0.inheritance]
     * 
     */
    constructor({ datas = null, api = null, inheritance = null, classes = DEFAULT_CLASSES } = {}) {
        this._classes = classes
        // @ts-ignore
        this.resolver = new classes.resolver(this)

        if (datas === false) {

            this.bords = inheritance?.bords
            this.states = inheritance?.states

            this.histories = inheritance?.histories
            this.histories.context.setContext(this)
            this._branches = inheritance?.branches
            this.reporter = inheritance?.reporter
            this._countRef = inheritance?._countRef


            this._linkMap = inheritance?._linkMap



            this.engine = inheritance?.engine
            this.workflows = inheritance?.workflows
            this.executors = inheritance?.executors

            this.setBranchId(inheritance?.branchId)

            this.setApi(inheritance)

            return
        }




        this.engine = new classes.engine(datas?.engine)


        this.bords = new classes.bords(datas?.bords)


        this.states = new classes.states(datas?.states)

        this.workflows = new classes.workflows(datas?.workflows)
        this.executors = new classes.executors(datas?.executors)

        /**
         * @type {Histories}
         */
        this.histories = new classes.histories({ states: this.states, bords: this.bords }, datas?.histories)
        this.histories.context.setContext(this)
        this._branches = datas?.branches || {}


        this._countRef = datas?._countRef || { n: 0 }
        this._linkMap = datas?._linkMap || {}

        if (datas === null || !datas.states) {
            this._branchId = this._createIdMap()

            this.resolver.resolveStartProcess()



        }
        else {
            this.setBranchId(datas._branchId)

        }
        this.setApi(api)









    }
    /**
     * 
     * @param {import("./protocol.js").ContextApi?} api
     */
    setApi(api) {
        const { functions = {}, reporter = {} } = this._forkApi(api?.reporter, api?.functions)
        this.functions = functions
        this.reporter = reporter
    }

    /**
     * @returns {import("./protocol.js").ContextSerializableData}
     */
    getSerializableData() {
        return {
            bords: this.bords.getSerializableData(),
            states: this.states.getSerializableData(),
            histories: this.histories.getSerializableData(),
            branches: this._branches,
            engine: this.engine.getSerializableData(),
            executors: this.executors,
            _countRef: this._countRef,
            _linkMap: this._linkMap,



        }

    }
    /**
     * 
     * @param {this} otherContext 
     */
    eq(otherContext) {
        return this.getBranchId() === otherContext.getBranchId()



    }


    isRoot() {
        return this.states.isRoot()

    }
    isEmptyNow() {
        return this.states.isEmptyNow()

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
     * @param {*} id 
     */
    getStateBranch(id) {
        const stateBranchId = this._branches[id].states
        return this.states.getStack(stateBranchId)
    }
    /**
     * 
     * @param {*} id 
     */
    getBordsBranch(id) {
        const bordsBranchId = this._branches[id].bords
        return this.bords.getBranch(bordsBranchId)

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
    getImutableData() {
        /**
        * @type {import("./protocol.js").ImutableData}
        */
        const datas = {



            engine: this.engine.getSerializableData(),
            workflows: this.workflows.getSeriaraizableData(),
            executors: this.executors.getSeriaraizableData()
        }
        return datas
    }
    /**
     * @param {*} workflowPlugins 
     * @param {*} executorPlugins 
     */
    setPlugins(workflowPlugins, executorPlugins) {
        this.workflows.setPlugins(workflowPlugins)
        this.workflows.setPlugins(executorPlugins)

    }

    /**
     * @param {any} id
     * @param {{ states: number | null | undefined; histories: { state?: any; request?: any; bords?: { global?: any; currentWorkflow?: any; subWorkflow?: any; }; } | null | undefined; } | null} branchIds
     * @param {null| true | number} step     * 
     * @param {Bords} bords
     */
    _fork(id, branchIds, bords, step = null) {





        const states = this.states.fork(branchIds?.states)
        const histories = this.histories.fork(branchIds?.histories, { states, bords }, step)
        let branchId = id
        if (isVoid(id) === true) {
            branchId = this._createIdMap({ bords, states, histories })
            this._linkMap[branchId] = this._branchId



        }

        /**
        * @type {import("./protocol.js").ContextInheritance}
        */
        const inheritance = {
            bords,
            states,
            histories,
            _countRef: this._countRef,
            branches: this._branches,
            functions: this.functions,
            reporter: this.reporter,
            engine: this.engine,
            workflows: this.workflows,
            _linkMap: this._linkMap,
            branchId,
            executors: this.executors
        }

        /**
         * @type {this}
         */
        // @ts-ignore
        const forked = new this.constructor({ inheritance, classes: this._classes, datas: false })




        return forked



    }
    /**
     * 
     * @param {import("./protocol.js").MaybeForkType?} reporter 
     * @param {import("./protocol.js").MaybeForkTypeMap?} functions
     * @returns {{functions:any, reporter:any}} 
     */
    _forkApi(reporter, functions) {
        const forkedFunctions = {}

        for (const key in functions) {
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
     * @param {import("../states/context.cjs").StatesContext?} [param0.states] 
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











}



module.exports = { Context }