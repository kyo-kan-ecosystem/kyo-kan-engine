const { PluginBundleBuilder } = require("./plugins/bundle/builder.cjs")

class ScenarioCompiler {
    /**
     * @type {import("./plugins/loader/loader.cjs").PluginPackLoader}
     */
    pluginPackLoader

    /**
     * @type { PluginBundleBuilder }
     */
    pluginsManagerBuilder

    /**
     * 
     * @param {import("./plugins/loader/loader.cjs").PluginPackLoader} pluginPackLoader 
     * @param {PluginBundleBuilder?} pluginsPackManagerBuilder 
     */
    constructor(pluginPackLoader, pluginsPackManagerBuilder) {
        this.pluginPackLoader = pluginPackLoader
        this.pluginsManagerBuilder = pluginsPackManagerBuilder || new PluginBundleBuilder()
    }

    /**
     * 
     * @param {import('./scenario.cjs').Scenario} scenarioObject 
     */
    async conpileFromObject(scenarioObject) {

        const pluginsManager = await this.pluginsManagerBuilder.build(scenarioObject.pluginPacks)
        return Object.assign({ pluginsManager }, scenarioObject.getSeriaraizableData())


    }
}

module.exports = { ScenarioCompiler }