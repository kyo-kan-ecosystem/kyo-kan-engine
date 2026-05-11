

/**
 * @template  [DataType=any]
 */

class Repositry {
    /**
     * @type {{[k in any]:DataType}}
     */
    _datas
    /**
     * 
     * @param {{[k in any]:DataType}} [datas={}] 
     */
    constructor(datas = {}) {
        this._datas = Object.assign({}, datas)

    }
    /**
     * 
     * @param {any} id 
     * @param {DataType} data 
     */
    set(id, data) {
        if (typeof id === 'undefined' || id === null) {
            throw new Error(`Invalid id ${id}`)


        }

        this._datas[id] = data
    }
    /**
     * 
     * @param {any} id 
     * 
     */
    get(id) {

        return this._datas[id]
    }
    getDatas() {
        return this._datas
    }
}

module.exports = { Repositry }