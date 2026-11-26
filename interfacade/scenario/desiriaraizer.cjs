const { PluginPackLoader } = require("./plugins/loader/loader.cjs")

class ScenarioDesiriaraizer {

    /**@type { PluginPackLoader} */
    pluginPackLoader

    /**
     * @param {PluginPackLoader} pluginPackLoader
     */
    constructor(pluginPackLoader) {
        this.pluginPackLoader = pluginPackLoader

    }
    /**
     * 
     * @param {import("./protocol").ScenarioJsonFormat} data 
     */
    async desiriaraize(data) {


        const pluginPacks = await this.pluginPackLoader.load(data.pluginPacks)




    }
}

module.exports = { ScenarioDesiriaraizer }