const { assert } = require('chai')
const { Context } = require('../../context/index.cjs')
const { ResolverParseContext } = require('./parse_context.cjs')
const { log } = require('console')



/**
 * @type {Context}
 */
let context

/**
 * @type {ResolverParseContext}
 */
let resolver

beforeEach(function () {

    const api = {}
    const workflows = {}
    const executors = {}

    context = new Context({ datas: { workflows, executors }, api })
    resolver = new ResolverParseContext(context)




})

describe('ResolverParseContext test', function () {
    it('should push named executor', () => {


        assert.equal(resolver.executorDatas.length, 0, 'resolver executorDatas should be initiaraized')
        const configure = {}
        const id = 'test'
        resolver.pushNamedExecutor(id, configure)
        assert.equal(resolver.executorDatas.length, 1, 'resolver executorDatas should be pushed')
        const pushed = resolver.executorDatas[0]

        assert.equal(pushed.id, id, 'id should be applyed')
        assert.equal(pushed.configure, configure, 'confiure shoud be applyed')
        assert.deepEqual(pushed.configurePath, { root: 'executor', expressions: [id] }, 'confiurePath shoud be applyed')




    })
    it('should push named workflow', () => {

        assert.equal(resolver.workflowDatas.length, 0, 'resolver workflowData should be initiaraized')
        const configure = {}
        const id = 'test'
        resolver.pushNamedWorkflow(id, configure)
        assert.equal(resolver.workflowDatas.length, 1, 'resolver workflowDatas should be pushed')
        const pushed = resolver.workflowDatas[0]

        assert.equal(pushed.id, id, 'id should be applyed')
        assert.equal(pushed.configure, configure, 'confiure shoud be applyed')
        assert.deepEqual(pushed.configurePath, { root: 'workflow', expressions: [id] }, 'confiurePath shoud be applyed')




    })
    it('should push root workflow', () => {

        assert.equal(resolver.workflowDatas.length, 0, 'resolver workflowData should be initiaraized')
        const configure = {}

        resolver.setRootWorkflow(configure)
        assert.equal(resolver.workflowDatas.length, 1, 'resolver workflowDatas should be pushed')
        const pushed = resolver.workflowDatas[0]
        const rootWorkflowConfigure = context.engine.configure.get().root.workflow

        assert.equal(pushed.id, rootWorkflowConfigure.id, 'id should be applyed')
        assert.deepEqual(pushed.configure, { plugin: rootWorkflowConfigure.plugin }, 'confiure shoud be applyed')
        assert.deepEqual(pushed.configurePath, { root: 'root', expressions: [] }, 'confiurePath shoud be applyed')




    })
    it('should add boot plugin', () => {


        assert.equal(resolver.executorDatas.length, 0, 'resolver executorDatas should be initiaraized')
        const configure = {}

        resolver.pushBootExecutors([configure])
        assert.equal(resolver.executorDatas.length, 1, 'resolver executorDatas should be pushed')
        const pushed = resolver.executorDatas[0]

        assert.equal(pushed.id, 0, 'id should be applyed')
        assert.equal(pushed.configure, configure, 'confiure shoud be applyed')
        assert.deepEqual(pushed.configurePath, { root: 'boot', expressions: [0] }, 'confiurePath shoud be applyed')




    })
    it('should hadle linked boot plugin configure', () => {


        assert.equal(resolver.executorDatas.length, 0, 'resolver executorDatas should be initiaraized')
        const id = 'test'
        const configure1 = { id }
        const configure2 = {}

        resolver.pushBootExecutors([configure1, configure2])
        assert.equal(resolver.executorDatas.length, 1, 'linked configure  should not be pushed to resolver executorDatas')
        assert.equal(context.executors.bootConfigures.getDatas()[0], id)

        const pushed = resolver.executorDatas[0]
        assert.equal(pushed.id, 0, 'id should be applyed')
        assert.equal(pushed.configure, configure2, 'confiure shoud be applyed')
        assert.deepEqual(pushed.configurePath, { root: 'boot', expressions: [0] }, 'confiurePath shoud be applyed')



    })









})



