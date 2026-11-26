const { LinerStoreBuilder } = require("./liner_store.cjs")

class ComplexStoreBuilder extends LinerStoreBuilder {
    /**
     * @param {any} memoryStoreBuilder
     * @param {any} seriaraizeStoreBuilder
     */
    constructor(memoryStoreBuilder, seriaraizeStoreBuilder) {
        const builders = [memoryStoreBuilder, seriaraizeStoreBuilder]
        super(builders)
    }

}

module.exports = { ComplexStoreBuilder }