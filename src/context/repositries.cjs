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
 *           engine: typeof EngineConfigureRepositry         
 *     }
 *  }
 * } ContextRepositryClasses
    
 * 
 */







/**
 * @type {ContextRepositryClasses}
 */
const DEFAULT_REPOSITRY_CLASSES = {
    configures: {

        engine: EngineConfigureRepositry

    },



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
     * 
     * @param {ContextRepositryArgs} args 
     */
    constructor(args = {}) {
        const { configures = {}, classes = DEFAULT_REPOSITRY_CLASSES } = args



        this.configures = {



            engine: new classes.configures.engine(configures.engine || {}),

        }




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