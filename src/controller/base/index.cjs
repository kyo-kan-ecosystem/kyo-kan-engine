

const { Context } = require("../../context/index.cjs")

const { ContextBuilder } = require("./context_builder.cjs")
/**
 * @typedef {import("../../workflow/plugin/protocol.class.cjs").AbstractWorkflow} WorkFlowPluginType
 */




class Controller {
    /**
     * 
     * @param {*} request 
     * @param {import("../../context/index.cjs").Context} context 
     */
    exec(request, context) {


    }
    /**
     * 
     * @param {*} funcname 
     * @param {*} context 
     */
    _execWorkflow(funcname, context) {

    }


}

module.exports = { Controller }