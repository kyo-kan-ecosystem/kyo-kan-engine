class RepositryContext {
    constructor(datas = {}) {
        this._datas = datas

    }
    set(id, data) {
        this._datas[id] = data
    }
    get(id) {
        return this._datas[id]
    }
    getSerializeData() {
        return this._datas
    }
}

module.exports = { RepositryContext }