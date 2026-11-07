const { PluginsManagerBuilder } = require("./plugins/manager_builder.cjs")
const { Scenario } = require("./scenario.cjs")
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
     * @param {import("./protocol").ScenarioJsonFormat} seriaraizedScenario 
     */
    async compileFromSeriaraized(seriaraizedScenario) {
        const pluginPacks = await this.pluginPackLoader.load(seriaraizedScenario.pluginPacks)
        const pluginsManager = await this.pluginsManagerBuilder.convertFromObjects(pluginPacks)
        return Object.assign({ pluginsManager }, seriaraizedScenario)


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