const { Repositry } = require("../../repositry/base.cjs")
const { create_id } = require("../../util/create_id.cjs")

class WorkflowConfiguresRepositry extends Repositry {


    set(worflowName, data, calleId) {

        const id = create_id(calleId, worflowName)
        super.set(id, data)
        return { worflowName, calleId }

    }
    get(worflowName, calleId) {
        return super.get(create_id(calleId, worflowName))
    }


}

module.exports = { WorkflowConfiguresRepositry }