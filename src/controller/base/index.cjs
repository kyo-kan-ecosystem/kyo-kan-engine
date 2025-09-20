
const { Context } = require("./context/index.cjs")


/**
 * @typedef {import("./context/index.cjs").ContextInit} ContextInit
 */
class ContextBuilder {

    /**
     * @type {typeof Context}
     */
    _contextClass

    /**
     * 
     * @param {typeof Context?} contextClass 
     */
    constructor(contextClass) {
        this._contextClass = contextClass || Context
    }
    /**
     * @param {ContextInit} args 
     * @returns {Context}
     */
    _buildContext(contextInit) {
        return new this._contextClass(contextInit)
    }

}
class Registrater extends ContextBuilder {
    /**
     * @type {Context}
     */
    context
    /**
     * 
     * @param {ContextInit?} contextInit 
     * @param {typeof Context?} contextClass 
     */
    constructor(contextInit, contextClass) {
        super(contextClass)
        this.context = this._buildContext(contextInit)


    }
    registerExecutorPlugin(pluginName, plugin) {
        this.context.repositries.plugins.executors.set(pluginName, plugin)
    }
    registerWorkflowPlugin(pluginName, plugin) {
        this.context.repositries.plugins.workflows.set(pluginName, plugin)
    }
    /**
     * 
     * @param {import("../../engine/repositry/configure.cjs").EngineConfigure} values 
     */
    setEngineConfigue(values) {
        this.context.repositries.configures.engine.update(values)

    }
    parseConfigures(configures) {
        /**
         * @type 
         */
        const rootWorkflow = this.context.repositries.configures.engine
    }



}

class Controller {
    /**
     * 
     * @param {{executer?:any, workflow:any}} repositryData 
     * @param {type Repositry} workflowRepositryClass 
     * @param {type Repositry} pluginRepositryClass 
     
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