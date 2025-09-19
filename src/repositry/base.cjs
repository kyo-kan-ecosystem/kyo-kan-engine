const { create_id } = require("../util/create_id.cjs")
/**
 * @template IDType
 */
class Repositry {
    constructor(datas = {}) {
        this._datas = Object.assign({}, datas)

    }
    /**
     * 
     * @param {IDType} id 
     * @param {*} data 
     */
    set(id, data) {
        this._datas[id] = data
    }/**
     * 
     * @param {IDType} id 
     * @param {*} data 
     */

    get(id) {
        return this._datas[id]
    }
    getSerializeDatas() {
        return this._datas
    }
}

module.exports = { Repositry }