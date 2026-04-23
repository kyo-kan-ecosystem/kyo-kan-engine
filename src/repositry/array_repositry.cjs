/**
 * @template DataType
 */
class ArrayRepositry {
    /**
     * @type {DataType[]}
     */
    _datas
    /**
     * @param {DataType[]?} datas
     */
    constructor(datas = null) {
        this._datas = datas || []


    }
    getAll() {
        return this._datas

    }
    /**
     * @param {DataType} data
     */
    add(data) {
        const id = this._datas.length
        this._datas.push(data)
        return id

    }
    getSerializeDatas() {
        return this._datas
    }


}

module.exports = { ArrayRepositry }