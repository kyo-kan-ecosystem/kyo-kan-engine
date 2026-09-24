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

describe('test', () => {
    beforeEach(function () {
        const api = {}
        const workflows = {}
        const executors = {}

        context = new Context({ datas: { workflows, executors }, api, autoStart: false })
        resolver = new ResolverParseContext(context)


    })
    it('push named executor', () => {
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
})



