const { dynamicDefault } = require("../../src/util/is_void.cjs")

/**
 * @abstract
 * @template [ValueType=any]
 * @implements {import("./protocol").StoreInterface<ValueType>} 
 */
class StoreTemplate {
    /**
     * @type {number | undefined}
     */
    epoc
    /**
     * 
     * @param {number | undefined} epoc 
     */
    constructor(epoc) {
        this.epoc = epoc

    }
    /**
     * 
     * @param {string} key
     * @param {ValueType} value
     * @param {number | undefined} epoc 
     */
    set(key, value, epoc) {
        const _epoc = dynamicDefault(epoc, this._epoc)
        this._set(key, value, epoc)

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
     * @returns {ValueType} 
     */
    get(key) {
        throw 'Not Implement'

    }

}