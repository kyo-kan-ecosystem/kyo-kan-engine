const deepmerge = require("deepmerge")
const { deepcopy } = require("../util/deepcopy.cjs")

/**
 * @template DataType
 */
class KeyValueRepositry {
    /**
     * @type {DataType}
     */
    _data
    /**
     * 
     * @param {DataType} data 
     */
    constructor(data) {
        this._data = deepcopy(data)

    }
    /**
     * 
     * @returns {DataType}
     */
    get() {
        return this._data
    }
    /**
     * 
     * @param {Partial<DataType>} value 
     */
    set(value) {
        this._data = deepmerge(this._data, value)

    }
    getSerializableData() {
        return this._data
    }
}

module.exports = { KeyValueRepositry }