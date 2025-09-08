const { create_id } = require("../util/create_id.cjs")

class Repositry {
    constructor(datas = {}) {
        this._datas = Object.assign({}, datas)

    }
    set(id, data) {
        this._datas[id] = data
    }
    get(id) {
        return this._datas[id]
    }
    getSerializeDatas() {
        return this._datas
    }
}

module.exports = { Repositry }