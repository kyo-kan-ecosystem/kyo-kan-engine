const { ExecutorPluginRepositry } = require("../../../executor/repositry/plugin.cjs");
const { ExecutorWorknodeRepositry } = require("../../../executor/repositry/worknode.cjs");

const { WorkflowPluginRepositry } = require("../../../workflow/repositry/plugin.cjs");
const { WorkflowRepositry } = require("../../../workflow/repositry/workflow.cjs");




/**
 * @typedef {{
 *       workflows?: any,
 *       worknodes?: any  
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
 *      },     
 *      plugins: {
 *           workflows: typeof WorkflowPluginRepositry,
 *           executors: typeof ExecutorPluginRepositry
 *      }} } ContextRepositryClasses
    
 * 
 */


/**
 * @typedef {{
 *      configures:ContextRepositryConfigures,
 *      plugins?:ContextRepositryPlugins,
 *      classes?:ContextRepositryClasses  
 * }} RepositryData
 * 
 */




/**
 * @type {ContextRepositryClasses}
 */
const DEFAULT_REPOSITRY_CLASSES = {
    configures: {
        workflows: WorkflowRepositry,
        worknodes: ExecutorWorknodeRepositry,
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
class ContextRepositries {
    /**
     * 
     * @param {ContextRepositryArgs} args 
     */
    constructor(args) {
        const { configures = {}, plugins = null, classes = DEFAULT_REPOSITRY_CLASSES } = args


        /**
         * @type {{workflows:WorkflowRepositry,worknodes:ExecutorWorknodeRepositry}}
         * 
        */
        this.configures = {}

        this.configures.workflows = new classes.configures.workflows(configures.workflows || {})
        this.configures.worknodes = new classes.configures.worknodes(configures.worknodes || {})
        /**
         * @type {{
         *  workflows: WorkflowPluginRepositry,
         *  executors: ExecutorPluginRepositry
         * 
         * }}
         */
        this.plugins = {}
        if (plugins) {
            this.plugins = plugins


        }
        else {
            this.plugins.workflows = new classes.plugins.workflows({})
            this.plugins.executors = new classes.plugins.executors({})
        }

    }
}

module.exports = { ContextRepositries }