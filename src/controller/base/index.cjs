

const { Context } = require("./context/index.cjs")

const { ContextBuilder } = require("./context_builder.cjs")
/**
 * @typedef {import("../../workflow/plugin/base_class.cjs").BaseWorkflow} WorkFlowPluginType
 */




class Controller extends ContextBuilder {
    /**
     * 
     * @param {*} request 
     * @param {*} context 
     */
    exec(request, context) {


    }
}

module.exports = { Controller }