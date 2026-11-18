
/**
 * 
 * @typedef {import('./protocol.d.ts').StoreInterface} StoreInterface
 * @implements {StoreInterface}
 * @abstract
 */
class AbtractSeriaraizableStore {
    /**
     * @type {StoreInterface}
     */
    store

    /**
     * 
     * @param {Object} param0
     * @param {StoreInterface} [param0.store]
     *   
     */

    constractor({ store }) {

        this.store = seriaraizeStore
    }
    async set(key, value, epoc) {
        const seriaraized = JSON.stringify(this._seriaraize(value))
        await this.store.set(key, seriaraized, epoc)

    }
    /**
     * 
     * @param {*} value 
     */
    _seriaraize(value) {
        throw 'Not Implement'
    }
    _deseriaraize(value) {
        throw 'Not Implement'
    }
    /**
     * 
     * @param {*} key 
     * @returns {import('./protocol.d.ts').StoreGetResponse}
     */
    async get(key) {

        const seriaraized = await this.store.get(key)
        if (seriaraized.isExist === false) {
            return seriaraized
        }
        return {
            isExist: true,
            value: this._deseriaraize(JSON.stringify(seriaraized.value))

        }




    }
}

module.exports = { AbtractSeriaraizableStore }