const { EngineConfigureRepositry } = require("../../../engine/repositry/configure.cjs");
const { ExecutorPluginRepositry } = require("../../../executor/repositry/plugin.cjs");
const { ExecutorConfigureRepositry } = require("../../../executor/repositry/configure.cjs");

const { WorkflowPluginRepositry } = require("../../../workflow/repositry/plugins.cjs");
const { WorkflowConfiguresRepositry } = require("../../../workflow/repositry/configures.cjs");




/**
 * @typedef {{
 *       workflows?: any,
 *       executors?: any,
 *       engine?: any
 * }} ContextRepositryConfigureInits
 */
/**
 * @typedef {{
 *       workflows: WorkflowConfiguresRepositry,
 *       execteNodes: ExecutorConfigureRepositry
 *       engine: EngineConfigureRepositry
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
 *          workflows: typeof WorkflowConfiguresRepositry,
 *          executors: typeof ExecutorConfigureRepositry,
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
        workflows: WorkflowConfiguresRepositry,
        executors: ExecutorPluginRepositry,
        engine: EngineConfigureRepositry
    },

    plugins: {
        workflows: WorkflowPluginRepositry,
        executors: ExecutorPluginRepositry
    }


}
/**
 * @typedef {{
 *          configures?:ContextRepositryConfigureInits, 
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
        this.configures.exectenodes = new classes.configures.executors(configures.exectenodes || {})

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