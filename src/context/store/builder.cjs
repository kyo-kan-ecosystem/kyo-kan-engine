const { ComplexStoreBuilder } = require("../../util/store/complex_store.cjs")
const { ContextStoreSeriaraizeBuilder } = require("./seriaraize.cjs")

class ContextStoreBuilder extends ComplexStoreBuilder {
    /**
     * @param {any} memoryStoreBuilder
     * @param {any} seriaraizedDataStoreBuilder
     */
    constructor(memoryStoreBuilder, seriaraizedDataStoreBuilder, contextStoreSeriaraizeBuilderClass = ContextStoreSeriaraizeBuilder) {
        const _seriaraizedDataStoreBuilder = new contextStoreSeriaraizeBuilderClass(seriaraizedDataStoreBuilder)
        super(memoryStoreBuilder, _seriaraizedDataStoreBuilder)
    }
}

module.exports = { ContextStoreBuilder }