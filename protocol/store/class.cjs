const { dynamicDefault, isVoid } = require("../../src/util/is_void.cjs")

/**
 * @typedef {import("./protocol").StoreInterface} StoreInterface
 * @template [ValueType=any]
 * @implements {StoreInterface<ValueType>} 
 */
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
     * @param {ValueType} value
     * @param {number | undefined} epoc 
     */
    async set(key, value, epoc) {

        const _key = this.namespace + ':' + key
        return this._set(_key, value, epoc)

    }
    /**
     * @abstract
     * @param {string} key
     * @param {ValueType} value  
     * @param {*} epoc 
     */
    _set(key, value, epoc) {
        throw 'Not Implement'
    }
    /**
     * @abstract
     * @param {*} key
     * @returns {value:ValueType,}
     */
    get(key) {
        const _key = this._createKeyWithNamespace(key)
        return



    }
    _get(key) {
        throw 'Not Implement'
    }
    _createKeyWithNamespace(key) {
        return this.namespace + : + key

    }

}
module.exports = { StoreTemplate }