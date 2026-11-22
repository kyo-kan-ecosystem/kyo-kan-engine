const { AbtractSeriaraizableStore } = require('../../util/store/seriaraizable.cjs')
const { Context } = require("../class.cjs")

class ContextStoreSeriaraize extends AbtractSeriaraizableStore {
    /**
     * @param {import("../../util/store/protocol").StoreInterface} store
     */
    constructor(store, contextClass = Context) {
        super(store)
        this.contextClass = contextClass
    }

    /**
     * @param {string} value
     */
    _deseriaraize(value) {
        // @ts-ignore
        return new this.contextClass(value)

    }
    /**
     * 
     * @param {Context} value 
     */
    _seriaraize(value) {
        return value.getSerializableData()

    }
}

class ContextStoreSeriaraizeBuilder {
    /**
     * @param {any} seriaraizedDataStoreBuilder
     * @param {typeof ContextStoreSeriaraize} [seriaraizeStoreClass=ContextStoreSeriaraize] 
     */
    constructor(seriaraizedDataStoreBuilder, seriaraizeStoreClass = ContextStoreSeriaraize) {
        this.seriaraizedDataStoreBuilder = seriaraizedDataStoreBuilder
        this.seriaraizeStoreClass = seriaraizeStoreClass
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