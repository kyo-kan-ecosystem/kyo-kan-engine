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


module.exports = { ContextStoreSeriaraize } 