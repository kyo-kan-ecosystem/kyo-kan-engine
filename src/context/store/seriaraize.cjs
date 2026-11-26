const { AbtractSeriaraizableStore } = require('../../../interfacade/store/seriaraizable.cjs')
const { Context } = require("../class.cjs")

class ContextStoreSeriaraize extends AbtractSeriaraizableStore {
    /**
     * @type {import('../../../interfacade/scenario/loader/protocol').ScenarioLoaderInterFace}
     */
    scenarioLoader
    /**
     * @param {import("../../../interfacade/store/protocol").StoreInterface} store
     * @param {import("../../../interfacade/scenario/loader/protocol").ScenarioLoaderInterFace} sceanrioLoader
     */
    constructor(store, sceanrioLoader, contextClass = Context) {
        super(store)
        this.contextClass = contextClass
        this.scenarioLoader = sceanrioLoader
    }

    /**
     * @param {import('./protocol').ContextStoreSeriaraizedValue} value
     * @returns {Promise<import('./protocol').ContextStoreValue>}
     */
    async _deseriaraize(value) {
        // @ts-ignore
        const context = new this.contextClass({ datas: value.context })
        const plugins = await this.scenarioLoader.loadPlugins(value.scenarioId)
        context.setPlugins(plugins.workflows, plugins.executors)
        return { context, scenarioId: value.scenarioId }


    }
    /**
     * 
     * @param {import('./protocol').ContextStoreValue} value
     * @returns {import('./protocol').ContextStoreSeriaraizedValue} 
     */
    _seriaraize(value) {
        return {
            context: value.context.getSerializableData(),
            scenarioId: value.scenarioId
        }

    }
}

class ContextStoreSeriaraizeBuilder {
    /**
     * @type {import('../../../interfacade/scenario/loader/protocol').ScenarioLoaderInterFace}
     */
    scenarioLoader

    /**
     * @param {any} seriaraizedDataStoreBuilder
     * @param {typeof ContextStoreSeriaraize} [seriaraizeStoreClass]
     * @param {import("../../../interfacade/scenario/loader/protocol").ScenarioLoaderInterFace} sceanrioLoader
     */
    constructor(seriaraizedDataStoreBuilder, sceanrioLoader, seriaraizeStoreClass = ContextStoreSeriaraize) {
        this.seriaraizedDataStoreBuilder = seriaraizedDataStoreBuilder
        this.seriaraizeStoreClass = seriaraizeStoreClass
        this.scenarioLoader = sceanrioLoader
        this.build = this.build.bind(this)

    }
    /**
     * 
     * @param {*} nameSpace 
     * @param {*} epoc 
     */
    build(nameSpace, epoc) {
        const store = this.seriaraizedDataStoreBuilder(nameSpace, epoc)
        return new this.seriaraizeStoreClass(nameSpace, epoc)


    }

}
module.exports = { ContextStoreSeriaraizeBuilder, ContextStoreSeriaraize } 