

const { Context } = require("./context/index.cjs")

const { ContextBuilder } = require("./context_builder.cjs")
/**
 * @typedef {import("../../workflow/plugin/base_class.cjs").BaseWorkflow} WorkFlowPluginType
 */




class Controller {
    /**
     * 
     * @param {{executer?:any, workflow:any}} repositryData 
     * @param {typeof Repositry} workflowRepositryClass 
     * @param {typeof Repositry} pluginRepositryClass 
     
     */
    constructor(repositryData, workflowRepositryClass = Repositry, executerRepositryClass = Repositry) {
        /**
         * @type {RepositryContext}
         */
        this.workflowRepositryContext = new workflowRepositryClass(repositryData.workflow)
        this.executerRepositryContext = new executerRepositryClass(repositryData.executer)

    }
    registerWorkflow(id, worklow) {
        this.workflowRepositryContext.set(id, worklow)

    }
    registerExecuter(id, executer) {
        this.executerRepositryContext.set(id, executer)
    }


    /**
     * 
     * @param {any} request 
     * @param {ControllerContext} context 
     */
    exec(request, context) {


    }
}

module.exports = { Registrater, Controller, ContextBuilder }