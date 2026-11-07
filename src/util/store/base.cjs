// @ts-ignore
const { dynamicDefault, isVoid } = require("../is_void.cjs")


class StoreTemplate {
    /**
     * @type {number | undefined}
     */
    epoc
    /**
     * @type {string?}
     */
    namespace
    /**
     * @param {Object} param0 
     * @param {number} [param0.epoc=100] 
     * @param {string?} [param0.namespace=null] 
     * 
     */
    constructor({ epoc = 100, namespace = null }) {
        this.epoc = epoc
        this.namespace = namespace

    }

    /**
     * 
     * @param {string} key
     * @param {any} value
     * @param {number | undefined} epoc 
     */
    async set(key, value, epoc) {

        const _key = this.namespace + ':' + key
        return this._set(_key, value, epoc)

    }
    /**
     * @abstract
     * @param {string} key
     * @param {any} value  
     * @param {*} epoc 
     */
    // @ts-ignore
    _set(key, value, epoc) {
        throw 'Not Implement'
    }
    /**
     * @abstract
     * @param {*} key
     * @returns {{value?:any ,}}
     */
    get(key) {
        const _key = this._createKeyWithNamespace(key)
        // @ts-ignore
        return this._get(_key)



    }
    /**
     * @abstract
     * @param {*} key      
     * */
    _get(key) {
        throw 'Not Implement'
    }
    /**
     * 
     * @param {string} key 
     * @returns 
     */
    _createKeyWithNamespace(key) {
        return this.namespace + ':' + key

    }

}
module.exports = { StoreTemplate }