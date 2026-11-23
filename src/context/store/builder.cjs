const { ComplexStoreBuilder } = require("../../util/store/complex_store.cjs")
const { ContextStoreSeriaraizeBuilder } = require("./seriaraize.cjs")

class ContextStoreBuilder extends ComplexStoreBuilder {


    /**
     * @param {any} memoryStoreBuilder
     * @param {any} seriaraizedDataStoreBuilder
     * @param {import("../../../interfacade/controller/protocol.d.ts").ScenarioLoader} sceanrioLoader
     */
    constructor(memoryStoreBuilder, seriaraizedDataStoreBuilder, sceanrioLoader, contextStoreSeriaraizeBuilderClass = ContextStoreSeriaraizeBuilder) {
        const _seriaraizedDataStoreBuilder = new contextStoreSeriaraizeBuilderClass(seriaraizedDataStoreBuilder)
        super(memoryStoreBuilder, _seriaraizedDataStoreBuilder)
        this.scenarioLoader = sceanrioLoader
    }
}

module.exports = { ContextStoreBuilder }