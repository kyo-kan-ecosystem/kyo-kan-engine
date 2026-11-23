
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
    // @ts-ignore
    store

    /**
     * 
     * @param {StoreInterface} store
     *   
     */
    constructor(store) {

        this.store = store
    }
    /**
     * @param {string} key
     * @param {string} value
     * @param {number | undefined} [epoc]
     */
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
    /**
     * 
     * @param {*} value 
     */
    _deseriaraize(value) {
        throw 'Not Implement'
    }
    /**
     * 
     * @param {*} key 
     * @returns {Promise<import('./protocol.d.ts').StoreGetResponse>}
     */
    async get(key) {

        const result = await this.store.get(key)
        if (result.isExist === false) {
            return result
        }
        return {
            isExist: true,
            value: await this._deseriaraize(JSON.parse(result.value))

        }




    }
}

module.exports = { AbtractSeriaraizableStore }