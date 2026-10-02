const { assert, expect } = require('chai')
const sinon = require('sinon')
const { Context } = require('./index.cjs')
const { ContextBridgeResolver } = require('../resolver/context/index.cjs')
const { Bords } = require('../bords/bords.cjs')
const { HistoriesContext: Histories } = require('../history/context.cjs')
const { States } = require('../states/states.cjs')
const { WorkflowsContext } = require('../workflow/context.cjs')
const { ExecutorsContext } = require('../executor/context.cjs')
const { EngineContext } = require('../engine/context.cjs')

describe('Context (repositries/engine/src/context/index.cjs)', function () {
    /**
     * @type {{ restore: () => void; spy: (arg0: ContextBridgeResolver | undefined, arg1: string | undefined) => any; stub: (arg0: Bords | States<import("../states/controll_state.cjs").ControllState> | Context<any, any, ContextBridgeResolver> | undefined, arg1: string | undefined) => { (): any; new (): any; returns: { (arg0: string | boolean): void; new (): any; }; }; }}
     */
    let sandbox

    beforeEach(function () {
        sandbox = sinon.createSandbox()
    })

    afterEach(function () {
        sandbox.restore()
    })

    describe('Constructor initialization with default classes', function () {
        it('should instantiate all sub-components with default classes when datas is null', function () {
            const context = new Context({})

            assert.instanceOf(context.bords, Bords)
            assert.instanceOf(context.engine, EngineContext)
            assert.instanceOf(context.states, States)
            assert.instanceOf(context.workflows, WorkflowsContext)
            assert.instanceOf(context.histories, Histories)
            assert.instanceOf(context.executors, ExecutorsContext)
            assert.instanceOf(context.resolver, ContextBridgeResolver)

            assert.equal(context.getBranchId(), 0)
            assert.deepEqual(context._countRef, { n: 1 })
            assert.isObject(context._branches)
            assert.isDefined(context._branches[0])
            assert.deepEqual(context._branches[0], {
                bords: 0,
                states: 0,
                histories: {
                    state: 0,
                    request: 0,
                    bords: { global: 0, currentWorkflow: 0, subWorkflow: 0 }
                }
            })
            assert.deepEqual(context.functions, {})
            assert.deepEqual(context.reporter, {})
        })

        it('should call resolver.resolveStartProcess on initial instantiation', function () {
            const resolveStartProcessSpy = sandbox.spy(ContextBridgeResolver.prototype, 'resolveStartProcess')
            const context = new Context({})
            assert.isTrue(resolveStartProcessSpy.calledOnce)
        })

        it('should set context reference on histories.context', function () {
            const context = new Context({})
            assert.equal(context.histories.context._context, context)
        })
    })

    describe('Constructor initialization with serialized data (restoration)', function () {
        it('should restore branchId and not call resolveStartProcess when datas.states exists', function () {
            const resolveStartProcessSpy = sandbox.spy(ContextBridgeResolver.prototype, 'resolveStartProcess')

            const dummyBranches = { 5: { bords: 1, states: 2, histories: 3 } }
            const dummyLinkMap = { 5: 0 }
            const dummyCountRef = { n: 6 }

            const context = new Context({
                datas: {
                    states: {},
                    _branchId: 5,
                    branches: dummyBranches,
                    _countRef: dummyCountRef,
                    _linkMap: dummyLinkMap
                }
            })

            assert.equal(context.getBranchId(), 5)
            assert.isFalse(resolveStartProcessSpy.called)
            assert.equal(context._branches, dummyBranches)
            assert.equal(context._countRef, dummyCountRef)
            assert.equal(context._linkMap, dummyLinkMap)
        })
    })

    describe('Constructor initialization with inheritance (datas === false)', function () {
        it('should inherit all properties and call histories.context.setContext without re-instantiation', function () {
            const setContextSpy = sandbox.spy()
            const mockHistories = {
                context: {
                    setContext: setContextSpy
                }
            }
            const inheritance = {
                bords: { id: 'mockBords' },
                states: { id: 'mockStates' },
                histories: mockHistories,
                branches: { 2: {} },
                reporter: { id: 'mockReporter' },
                _countRef: { n: 3 },
                _linkMap: { 2: 1 },
                engine: { id: 'mockEngine' },
                workflows: { id: 'mockWorkflows' },
                executors: { id: 'mockExecutors' },
                branchId: 2,
                functions: {}
            }

            const MockResolver = sandbox.stub()
            const classes = {
                resolver: MockResolver
            }

            const context = new Context({
                datas: false,
                inheritance,
                classes
            })

            assert.equal(context.bords, inheritance.bords)
            assert.equal(context.states, inheritance.states)
            assert.equal(context.histories, inheritance.histories)
            assert.isTrue(setContextSpy.calledWith(context))
            assert.equal(context._branches, inheritance.branches)
            assert.equal(context._countRef, inheritance._countRef)
            assert.equal(context._linkMap, inheritance._linkMap)
            assert.equal(context.engine, inheritance.engine)
            assert.equal(context.workflows, inheritance.workflows)
            assert.equal(context.executors, inheritance.executors)
            assert.equal(context.getBranchId(), 2)
            assert.equal(context.reporter, inheritance.reporter)
        })
    })

    describe('Constructor with custom classes (dependency injection)', function () {
        it('should instantiate provided custom classes', function () {
            const customBordsInstance = { getBranchId: () => 10 }
            const CustomBords = sandbox.stub().returns(customBordsInstance)

            const customStatesInstance = { getBranchId: () => 20 }
            const CustomStates = sandbox.stub().returns(customStatesInstance)

            const customHistoriesInstance = {
                context: { setContext: sandbox.stub() },
                getBranchId: () => 30
            }
            const CustomHistories = sandbox.stub().returns(customHistoriesInstance)

            const customEngineInstance = {}
            const CustomEngine = sandbox.stub().returns(customEngineInstance)

            const customWorkflowsInstance = {}
            const CustomWorkflows = sandbox.stub().returns(customWorkflowsInstance)

            const customExecutorsInstance = {}
            const CustomExecutors = sandbox.stub().returns(customExecutorsInstance)

            const customResolverInstance = { resolveStartProcess: sandbox.stub() }
            const CustomResolver = sandbox.stub().returns(customResolverInstance)

            const customClasses = {
                bords: CustomBords,
                states: CustomStates,
                histories: CustomHistories,
                engine: CustomEngine,
                workflows: CustomWorkflows,
                executors: CustomExecutors,
                resolver: CustomResolver
            }

            const context = new Context({ classes: customClasses })

            assert.isTrue(CustomBords.calledOnce)
            assert.isTrue(CustomStates.calledOnce)
            assert.isTrue(CustomHistories.calledOnce)
            assert.isTrue(CustomEngine.calledOnce)
            assert.isTrue(CustomWorkflows.calledOnce)
            assert.isTrue(CustomExecutors.calledOnce)
            assert.isTrue(CustomResolver.calledOnce)

            assert.equal(context.bords, customBordsInstance)
            assert.equal(context.states, customStatesInstance)
            assert.equal(context.histories, customHistoriesInstance)
            assert.equal(context.engine, customEngineInstance)
            assert.equal(context.workflows, customWorkflowsInstance)
            assert.equal(context.executors, customExecutorsInstance)
            assert.equal(context.resolver, customResolverInstance)
        })
    })

    describe('Branch ID management and eq()', function () {
        it('should get and set branchId', function () {
            const context = new Context({})
            assert.equal(context.getBranchId(), 0)

            context.setBranchId(10)
            assert.equal(context.getBranchId(), 10)
        })

        it('should return true when two contexts have the same branchId', function () {
            const context1 = new Context({})
            const context2 = new Context({})
            context2.setBranchId(context1.getBranchId())

            assert.isTrue(context1.eq(context2))
            assert.isTrue(context2.eq(context1))
        })

        it('should return false when two contexts have different branchIds', function () {
            const context1 = new Context({})
            const context2 = new Context({})
            context2.setBranchId(999)

            assert.isFalse(context1.eq(context2))
        })
    })

    describe('Delegation methods: isRoot and isEmptyNow', function () {
        it('should delegate isRoot to states.isRoot', function () {
            const context = new Context({})
            sandbox.stub(context.states, 'isRoot').returns(true)
            assert.isTrue(context.isRoot())

            context.states.isRoot.returns(false)
            assert.isFalse(context.isRoot())
        })

        it('should delegate isEmptyNow to states.isEmptyNow', function () {
            const context = new Context({})
            sandbox.stub(context.states, 'isEmptyNow').returns(true)
            assert.isTrue(context.isEmptyNow())

            context.states.isEmptyNow.returns(false)
            assert.isFalse(context.isEmptyNow())
        })
    })

    describe('getSerialiableData()', function () {
        it('should aggregate serializable data from components and internal maps', function () {
            const context = new Context({})
            const data = context.getSerializableData()

            assert.isObject(data)
            assert.property(data, 'bords')
            assert.property(data, 'states')
            assert.property(data, 'histories')
            assert.property(data, 'branches')
            assert.property(data, 'engine')
            assert.property(data, '_countRef')
            assert.property(data, '_linkMap')

            assert.deepEqual(data.branches, context._branches)
            assert.deepEqual(data._countRef, context._countRef)
            assert.deepEqual(data._linkMap, context._linkMap)
        })
    })

    describe('Branch creation and management (_createIdMap)', function () {
        it('should generate an ID, increment countRef, and store in _branches and _linkMap', function () {
            const context = new Context({})
            const initialCount = context._countRef.n

            const mockBords = { getBranchId: () => 101 }
            const mockStates = { getBranchId: () => 102 }
            const mockHistories = { getBranchId: () => 103 }

            const newId = context._createIdMap({
                bords: mockBords,
                states: mockStates,
                histories: mockHistories
            })

            assert.equal(newId, initialCount)
            assert.equal(context._countRef.n, initialCount + 1)
            assert.deepEqual(context._branches[newId], {
                bords: 101,
                states: 102,
                histories: 103
            })
            assert.equal(context._linkMap[newId], 0)
        })

        it('should fallback to context instances when arguments are not provided to _createIdMap', function () {
            const context = new Context({})
            const initialCount = context._countRef.n

            const newId = context._createIdMap()
            assert.equal(newId, initialCount)
            assert.deepEqual(context._branches[newId], {
                bords: context.bords.getBranchId(),
                states: context.states.getBranchId(),
                histories: context.histories.getBranchId()
            })
        })
    })

    describe('fork() and forkAsNamedTree()', function () {
        it('should throw an error when fork() is called with an unknown branch id', function () {
            const context = new Context({})
            expect(() => context.fork(999)).to.throw('branch id 999 is not found')
        })

        it('should invoke bords.forkAsNamedTree and _fork on forkAsNamedTree', function () {
            const context = new Context({})
            const forkedBords = { getBranchId: () => 200 }
            sandbox.stub(context.bords, 'forkAsNamedTree').returns(forkedBords)
            const forkStub = sandbox.stub(context, '_fork').returns('fork-result')

            const result = context.forkAsNamedTree('subTree')

            assert.isTrue(context.bords.forkAsNamedTree.calledWith('subTree'))
            assert.isTrue(forkStub.calledWith(null, null, forkedBords))
            assert.equal(result, 'fork-result')
        })

        it('should invoke bords.fork and _fork with branch info on fork(id)', function () {
            const context = new Context({})
            const branchData = context._branches[0]
            const forkedBords = { getBranchId: () => 300 }
            sandbox.stub(context.bords, 'fork').returns(forkedBords)
            const forkStub = sandbox.stub(context, '_fork').returns('fork-result')

            const result = context.fork(0)

            assert.isTrue(context.bords.fork.calledWith(branchData.bords))
            assert.isTrue(forkStub.calledWith(0, branchData, forkedBords))
            assert.equal(result, 'fork-result')
        })

        it('should perform states.fork and histories.fork inside _fork', function () {
            const forkedStates = { getBranchId: () => 1, fork: sandbox.stub() }
            const forkedHistories = {
                getBranchId: () => 2,
                fork: sandbox.stub(),
                context: { setContext: sandbox.stub() }
            }
            const forkedBords = { getBranchId: () => 3, fork: sandbox.stub() }

            const customClasses = {
                bords: class { getBranchId() { return 0 } fork() { return forkedBords } },
                states: class { getBranchId() { return 0 } fork() { return forkedStates } },
                histories: class {
                    constructor() { this.context = { setContext: () => { } } }
                    getBranchId() { return 0 }
                    fork() { return forkedHistories }
                },
                engine: class { },
                workflows: class { },
                executors: class { },
                resolver: class { resolveStartProcess() { } }
            }

            const context = new Context({ classes: customClasses })
            const branch = context._branches[0]

            const forked = context._fork(0, branch, forkedBords)
            assert.isDefined(forked)
            assert.instanceOf(forked, Context)
        })

        it('should pass step parameter to histories.fork in _fork', function () {
            const forkedStates = { getBranchId: () => 1, fork: sandbox.stub() }
            const historiesForkSpy = sandbox.stub().returns({
                getBranchId: () => 2,
                context: { setContext: sandbox.stub() }
            })
            const forkedHistories = {
                getBranchId: () => 2,
                fork: historiesForkSpy,
                context: { setContext: sandbox.stub() }
            }
            const forkedBords = { getBranchId: () => 3, fork: sandbox.stub() }

            const customClasses = {
                bords: class { getBranchId() { return 0 } fork() { return forkedBords } },
                states: class { getBranchId() { return 0 } fork() { return forkedStates } },
                histories: class {
                    constructor() { this.context = { setContext: () => { } } }
                    getBranchId() { return 0 }
                    fork() { return forkedHistories.fork(...arguments) }
                },
                engine: class { },
                workflows: class { },
                executors: class { },
                resolver: class { resolveStartProcess() { } }
            }

            const context = new Context({ classes: customClasses })
            const branch = context._branches[0]

            context._fork(0, branch, forkedBords, 5)
            assert.isTrue(historiesForkSpy.calledOnce)
            assert.equal(historiesForkSpy.firstCall.args[2], 5)
        })
    })

    describe('API forking (_forkApi)', function () {
        it('should invoke fork on reporter when reporter has a fork method', function () {
            const mockReporter = {
                fork: sandbox.stub().returns({ forkedReporter: true })
            }

            const context = new Context({
                api: { reporter: mockReporter }
            })

            assert.isTrue(mockReporter.fork.calledOnce)
            assert.isTrue(mockReporter.fork.calledWith(context.getBranchId(), context))
            assert.deepEqual(context.reporter, { forkedReporter: true })
        })

        it('should retain reporter as-is when reporter does not have a fork method', function () {
            const plainReporter = { log: () => { } }

            const context = new Context({
                api: { reporter: plainReporter }
            })

            assert.equal(context.reporter, plainReporter)
        })

        it('should handle null or undefined api gracefully', function () {
            const context = new Context({ api: null })
            assert.deepEqual(context.functions, {})
            assert.deepEqual(context.reporter, {})
        })

        it('should handle functions mapping in _forkApi', function () {
            const mockFn = {
                fork: sandbox.stub().returns('forkedFunction')
            }
            const context = new Context({
                api: {
                    functions: { '0': mockFn }
                }
            })

            assert.isTrue(mockFn.fork.calledOnce)
            assert.isTrue(mockFn.fork.calledWith(context.getBranchId(), context))
            assert.equal(context.functions['0'], 'forkedFunction')
        })
    })
})
