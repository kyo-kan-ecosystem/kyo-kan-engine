const { Repositry } = require("../../repositry/base.cjs")
const { createId } = require("../../util/create_id.cjs")
/**
 * Repositry for workflow configure
 * 
 * @extends {Repositry<import("../protocol").WorkflowPluginConfigure>}
 */
class WorkflowConfiguresRepositry extends Repositry {

    /**
     * 
     * @param {*} callerId Id of excutor plugin which call target workflow
     * @param {*} name  local name of target 
     * @param {*} configure 
     * 
     * @returns 
     */
    add(callerId, name, configure) {

        const id = createId(callerId, name)
        super.set(id, configure)
        return id



    }

    /**
     * @param {any} name
     * @param {any} calleId
     */
    getId(name, calleId) {
        return createId(calleId, name)
    }




}

module.exports = { WorkflowConfiguresRepositry }