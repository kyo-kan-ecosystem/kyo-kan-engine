const { create_id } = require("../util/create_id.cjs")

class Repositry {
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
class RepositryContext {
    /**
     * 
     * @param {typeof Repositry} repositryClass 
     */
    constructor(datas = {}, repositryClass = Repositry) {
        this.calleId = null
        /**
         * @type {Repositry}
         */
        this.repositry = new repositryClass(datas)

    }
    set(name, data) {

        const id = create_id(this.calleId, name)
        this.repositry.set(id, data)
        return { name, calleId: this.calleId }

    }
    get(name, data) {
        const id = create_id(this.calleId, name)
        this.repositry.set(id, data)
    }
    getSerializeDatas() {
        return this.repositry.getSerializeData()

    }
}
module.exports = { Repositry, RepositryContext }