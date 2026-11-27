

/**
 * @typedef {"executors"| "workflows"} PropertyKey
 */
class PluginBundle {
    /**
     * @type {{[k in string]:import("../../../../protocol/plugin/protocol").PluginManager }}
     */
    workflows

    /**
      * @type {{[k in string]:import("../../../../protocol/plugin/protocol").PluginManager }}
      */
    executors


    /**
     * 
     * @param {Object} param0 
     * @param {{[k in string]:import("../../../../protocol/plugin/protocol").PluginManager }} param0.workflows 
     * @param {{[k in string]:import("../../../../protocol/plugin/protocol").PluginManager }} param0.executors
     * 
     */
    constructor({ workflows, executors }) {
        this.workflows = workflows
        this.executors = executors

    }
    /**
     * 
     * @param {PropertyKey} key 
     */
    async _getPlugins(key) {


        /**
         * @type {{[id in string]:import("../../../../protocol/plugin/protocol").PluginManager}}
         */
        const target = this[key]

        const proms = []
        for (const id in target) {

            /**
             * @type {import("../../../../protocol/plugin/protocol").PluginManager}
             */
            const manager = target[id];
            proms.push(this._buildPlugin(id, manager))

        }
        const pluginAndIds = await Promise.all(proms)

        return Object.fromEntries(pluginAndIds)


    }
    /**
     * @param {*} id 
     * @param {import("../../../../protocol/plugin/protocol").PluginManager} manager 
     */
    async _buildPlugin(id, manager) {
        const plugin = await manager.build()
        return [id, plugin]

    }
}



module.exports = { PluginBundle }