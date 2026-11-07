const { isVoid } = require("../../../src/util/is_void.cjs")
const { ScenarioPluginPack } = require("./pluginpack.cjs")
const path = require('node:path')

/**
 * @typedef {"executors"| "workflows"} PropertyKey
 */
class PluginPackManager {
    /**
     * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
     */
    workflows

    /**
      * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
      */
    executors

    /**
     * @type {string[]}
     */
    urls
    /**
     * 
     * @param {Object} param0 
     * @param {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }} param0.workflows 
     * @param {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }} param0.executors 
     */
    constructor({ workflows, executors }, urls) {
        this.workflows = workflows
        this.executors = executors
        this.urls = urls

    }
    /**
     * 
     * @param {PropertyKey} key 
     */
    async _getPlugins(key) {


        /**
         * @type {{[id in string]:import("../../../protocol/plugin/protocol").PluginManager}}
         */
        const target = this[key]

        const proms = []
        for (const id in target) {

            /**
             * @type {import("../../../protocol/plugin/protocol").PluginManager}
             */
            const manager = target[id];
            proms.push(this._buildPlugin(id, manager))

        }
        const pluginAndIds = await Promise.all(proms)

        return Object.fromEntries(pluginAndIds)


    }
    /**
     * @param {*} id 
     * @param {import("../../../protocol/plugin/protocol").PluginManager} manager 
     */
    async _buildPlugin(id, manager) {
        const plugin = await manager.build()
        return [id, plugin]

    }
}



module.exports = { PluginPackManagerBuilder, PluginPackManager }