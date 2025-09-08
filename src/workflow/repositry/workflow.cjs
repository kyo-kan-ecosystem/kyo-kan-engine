const { Repositry } = require("../../repositry/base.cjs")
const { create_id } = require("../../util/create_id.cjs")
/**
 * @typedef {{calleId:any, datas:any}} WorkflowSerializeData
 */
class WorkflowRepositry extends Repositry {

    constructor(datas = {}) {
        super(datas)
        this.calleId = null


    }
    set(name, data) {

        const id = create_id(this.calleId, name)
        super.set(id, data)
        return { name, calleId: this.calleId }

    }
    get(name, data) {
        const id = create_id(this.calleId, name)
        super.set(id, data)
    }

}

module.exports = { WorkflowRepositry }