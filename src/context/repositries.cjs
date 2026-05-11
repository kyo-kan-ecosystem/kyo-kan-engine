const { BootExecutorConfigureRepositry } = require("../executor/repositry/boot.cjs");

const { EngineConfigureRepositry } = require("../engine/repositry/configure.cjs");


const { WorkflowPluginRepositry } = require("../workflow/repositry/plugins.cjs");
const { WorkflowConfiguresRepositry } = require("../workflow/repositry/configures.cjs");




/**
 * @typedef {{
 *       workflows?: any,
 *       executors?: any,
 *       engine?: any,
 *       boot?: any
 * }} ContextRepositry
 */
/**
 * @typedef {{
 *       workflows: WorkflowConfiguresRepositry,
 *       engine: EngineConfigureRepositry,
 * }} ContextRepositryConfigures
 */


/**
 * @typedef {{
 *          workflows:WorkflowPluginRepositry, 
 *}} ContextRepositryPlugins
 *    
 */
/**
 * @typedef {{
 *      configures:{
 *          workflows: typeof WorkflowConfiguresRepositry,           
 *          engine: typeof EngineConfigureRepositry         
 *      },     
 *      plugins: {
 *           workflows: typeof WorkflowPluginRepositry           
 *      }} } ContextRepositryClasses
    
 * 
 */







/**
 * @type {ContextRepositryClasses}
 */
const DEFAULT_REPOSITRY_CLASSES = {
    configures: {
        workflows: WorkflowConfiguresRepositry,
        engine: EngineConfigureRepositry

    },

    plugins: {
        workflows: WorkflowPluginRepositry,

    }


}
/**
 * @typedef {{
 *          configures?:ContextRepositry, 
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



        this.configures = {

            workflows: new classes.configures.workflows(configures.workflows || {}),

            engine: new classes.configures.engine(configures.engine || {}),

        }


        if (plugins) {
            this.plugins = plugins


        }
        else {
            this.plugins = {
                workflows: new classes.plugins.workflows({}),

            }

        }

    }

    getPluginRepositry() {
        return this.plugins
    }
    getConfiguresAsSerializeDatas() {
        const result = {}
        for (const [key, value] of Object.entries(this.configures)) {

            // @ts-ignore
            result[key] = value.getDatas()

        }
        return result
    }
}

module.exports = { Repositries }