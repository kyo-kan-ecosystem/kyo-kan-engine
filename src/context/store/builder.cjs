const { ComplexStoreBuilder } = require("../../../interfacade/store/complex_store.cjs")
const { ContextStoreSeriaraizeBuilder } = require("./seriaraize.cjs")

class ContextStoreBuilder extends ComplexStoreBuilder {


    /**
     * @param {any} memoryStoreBuilder
     * @param {any} seriaraizedDataStoreBuilder
     * @param {import("../../../interfacade/scenario/loader/protocol").ScenarioLoaderInterFace} sceanrioLoader
     */
    constructor(memoryStoreBuilder, seriaraizedDataStoreBuilder, sceanrioLoader, contextStoreSeriaraizeBuilderClass = ContextStoreSeriaraizeBuilder) {
        const _seriaraizedDataStoreBuilder = new contextStoreSeriaraizeBuilderClass(seriaraizedDataStoreBuilder, sceanrioLoader)
        super(memoryStoreBuilder, _seriaraizedDataStoreBuilder)
        this.scenarioLoader = sceanrioLoader
    }
}

module.exports = { ContextStoreBuilder }