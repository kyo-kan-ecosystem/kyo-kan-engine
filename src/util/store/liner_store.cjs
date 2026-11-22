const { isVoid, dynamicDefault } = require("../is_void.cjs")


class LinerStore {
    /**
     * @type {import('./protocol.d.ts').StoreInterface[]}
     */
    stores

    /**
     * 
     * @param {import('./protocol.d.ts').StoreInterface[]} stores 
     */
    constructor(stores = []) {
        this.stores = stores
    }
    /**
     * @param {string} key
     */
    async get(key) {
        let index = 0
        const len = this.stores.length
        /**
         * @type {import("./protocol.d.ts").StoreGetResponse}
         */
        const res = { isExist: false }
        while (index < len) {
            const store = this.stores[index]
            index++
            const result = await store.get(key)
            if (result.isExist === true) {
                res.isExist = true
                res.value = result.value
                break

            }


        }
        if (res.isExist === false) {
            return res
        }

        while (index > -1) {
            const store = this.stores[index]
            index--
            // @ts-ignore
            store.set(key, res.value)


        }
        return res
    }
    /**
     * @param {string} key
     * @param {any} value
     * @param {number | undefined} epoc
     */
    async set(key, value, epoc) {
        let index = 0
        const len = this.stores.length
        while (index < len) {
            const store = this.stores[index]
            index++
            store.set(key, value, epoc)


        }

    }

}

class LinerStoreBuilder {
    /**
     * @param {any} builders
     */
    constructor(builders, step = 2, storeClass = LinerStore) {
        this.builders = builders
        this.step = step
        this.storeClass = storeClass
        this.build = this.build.bind(this)
    }
    /**
     * 
     * @param {any} nameSpace
     * @param {any} epoc
     * @returns {import("./protocol.d.ts").StoreInterface} 
     */
    build(nameSpace, epoc) {


        let index = this.builders.length - 1
        let _epoc = epoc
        const stores = []
        while (index > 0) {
            const builder = this.builders[index]
            const store = builder(nameSpace, _epoc)
            _epoc = _epoc / this.step
            index -= 1
            stores.unshift(store)

        }
        return new this.storeClass(stores)

    }
}

module.exports = { LinerStore, LinerStoreBuilder }