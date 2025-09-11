const { Repositry } = require("../../repositry/base.cjs")
const { create_id } = require("../../util/create_id.cjs")
/**
 * @typedef {{calleId:any, datas:any}} WorkflowSerializeData
 */
class WorkflowRepositry extends Repositry {


    set(name, data, calleId) {

        const id = create_id(calleId, name)
        super.set(id, data)
        return { name, calleId }

    }
    get(name, calleId) {
        const id = create_id(calleId, name)
        super.get(id, data)
    }

}

module.exports = { WorkflowRepositry }