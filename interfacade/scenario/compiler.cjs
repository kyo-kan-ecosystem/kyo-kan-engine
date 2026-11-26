const { PluginsManagerBuilder } = require("./plugins/pluginpuck_manager_builder.cjs")

class ScenarioCompiler {
    /**
     * @type {import("./plugins/loader/loader.cjs").PluginPackLoader}
     */
    pluginPackLoader

    /**
     * @type { PluginsManagerBuilder }
     */
    pluginsManagerBuilder

    /**
     * 
     * @param {import("./plugins/loader/loader.cjs").PluginPackLoader} pluginPackLoader 
     * @param {PluginsManagerBuilder?} pluginsPackManagerBuilder 
     */
    constructor(pluginPackLoader, pluginsPackManagerBuilder) {
        this.pluginPackLoader = pluginPackLoader
        this.pluginsManagerBuilder = pluginsPackManagerBuilder || new PluginsManagerBuilder()
    }

    /**
     * 
     * @param {import('./scenario.cjs').Scenario} scenarioObject 
     */
    async conpileFromObject(scenarioObject) {

        const pluginsManager = await this.pluginsManagerBuilder.convertFromObjects(scenarioObject.pluginPacks)
        return Object.assign({ pluginsManager }, scenarioObject.getSeriaraizableData())


    }
}

module.exports = { ScenarioCompiler }