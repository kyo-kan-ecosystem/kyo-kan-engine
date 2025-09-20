const { Repositry } = require("../../repositry/base.cjs")
const { create_id } = require("../../util/create_id.cjs")

class WorkflowConfiguresRepositry extends Repositry {

    /**
     * 
     * @param {{calleId:any, name:any}} idParams 
     * @param {*} data 
     * 
     * @returns 
     */
    set(idParams, data,) {

        const id = create_id(idParams.calleId, idParams.name)
        super.set(id, data)


    }

    getId(worflowName, calleId) {
        return create_id(calleId, worflowName)
    }




}

module.exports = { WorkflowConfiguresRepositry }