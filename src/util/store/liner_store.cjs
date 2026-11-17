import { isVoid } from "../is_void.cjs"
import { StoreTemplate } from "./base.cjs"

class LinerStore extends StoreTemplate {
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
    async _get(key) {
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
            store.set(key, res.value)


        }
        return res
    }
}

module.exports = { LinerStore }