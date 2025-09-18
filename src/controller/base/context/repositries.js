const { EngineConfigureRepositry } = require("../../../engine/repositry/configure.cjs");
const { ExecutorPluginRepositry } = require("../../../executor/repositry/plugin.cjs");
const { ExecutorWorknodeRepositry } = require("../../../executor/repositry/worknode.cjs");

const { WorkflowPluginRepositry } = require("../../../workflow/repositry/plugin.cjs");
const { WorkflowRepositry } = require("../../../workflow/repositry/workflow.cjs");




/**
 * @typedef {{
 *       workflows?: any,
 *       worknodes?: any,
 *       engine?: any
 * }} ContextRepositryConfigures
 */


/**
 * @typedef {{
 *          workflows:WorkflowPluginRepositry, 
 *          executors:ExecutorPluginRepositry
 * }} ContextRepositryPlugins
 *    
 */
/**
 * @typedef {{
 *      configures:{
 *          workflows: typeof WorkflowRepositry,
 *          worknodes: typeof ExecutorWorknodeRepositry,
 *          engine: typeof EngineConfigureRepositry
 *      },     
 *      plugins: {
 *           workflows: typeof WorkflowPluginRepositry,
 *           executors: typeof ExecutorPluginRepositry
 *      }} } ContextRepositryClasses
    
 * 
 */







/**
 * @type {ContextRepositryClasses}
 */
const DEFAULT_REPOSITRY_CLASSES = {
    configures: {
        workflows: WorkflowRepositry,
        worknodes: ExecutorWorknodeRepositry,
        engine: EngineConfigureRepositry
    },

    plugins: {
        workflows: WorkflowPluginRepositry,
        executors: ExecutorPluginRepositry
    }


}
/**
 * @typedef {{
 *          configures?:ContextRepositryConfigures, 
 *          plugins?:ContextRepositryPlugins,
 *          classes?:ContextRepositryClasses
 * }} ContextRepositryArgs
 */
class Repositries {
    /**
     * @type {ContextRepositryConfigures}
     */
    configures
    /**
     * @type {ContextRepositryPlugins}
     */
    plugins

    /**
     * 
     * @param {ContextRepositryArgs} args 
     */
    constructor(args) {
        const { configures = {}, plugins = null, classes = DEFAULT_REPOSITRY_CLASSES } = args || {}



        this.configures = {}

        this.configures.workflows = new classes.configures.workflows(configures.workflows || {})
        this.configures.worknodes = new classes.configures.worknodes(configures.worknodes || {})

        this.plugins = {}
        if (plugins) {
            this.plugins = plugins


        }
        else {
            this.plugins.workflows = new classes.plugins.workflows({})
            this.plugins.executors = new classes.plugins.executors({})
        }

    }
    getPluginRepositry() {
        return this.plugins
    }
    getConfiguresAsSerializeDatas() {
        const result = {}
        for (const [key, value] of Object.entries(this.configures)) {
            result[key] = value.getSerializeDatas()

        }
        return result
    }
}

module.exports = { Repositries }