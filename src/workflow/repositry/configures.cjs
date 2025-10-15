const { Repositry } = require("../../repositry/base.cjs")
const { create_id } = require("../../util/create_id.cjs")

class WorkflowConfiguresRepositry extends Repositry {

    /**
     * 
     * @param {*} calleId
     * @param {*} name  
     * @param {*} data 
     * 
     * @returns 
     */
    add(calleId, name, data,) {

        const id = create_id(calleId, name)
        super.set(id, data)
        return id



    }

    /**
     * @param {any} name
     * @param {any} calleId
     */
    getId(name, calleId) {
        return create_id(calleId, name)
    }




}

module.exports = { WorkflowConfiguresRepositry }