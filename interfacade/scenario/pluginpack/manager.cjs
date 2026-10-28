const { ScenarioPluginPack } = require("./pluginpack.cjs")


/**
 * @typedef {"executorPlugins"| "workflowPlugins"} PropertyKey
 */
class PluginPackManager {
    /**
     * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
     */
    workflowPlugins

    /**
      * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
      */
    executorPlugins

    /**
     * 
     * @param {ScenarioPluginPack[]} packs 
     */
    static async build(packs) {
        /**
         * @type {{[modulePath in string]:{id:any, propertyKey:PropertyKey, moduleName:string| undefined}[]}}
         */
        const modulePathToPackages = {}
        for (const pack of packs) {
            /**
             * @type {[import("./protocol").PluginPackageConfigureType,PropertyKey][]}
             */
            const pluginAndPropertyKeys = [[pack.getWorkflowPlugins(), 'workflowPlugins'], []]



        }

    }
    /**
     * 
     * @param {} packs 
     */
    constructor(packs) {
        this.packs = packs

    }
}

