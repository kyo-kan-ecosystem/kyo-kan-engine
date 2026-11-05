

class PluginpackLoader {
    /**
     * @type {import("./resolver/protocol.class.cjs").AbstractScenarioPluginpackResolver}
     */
    resolver
    /**
     * 
     * @param {import("./resolver/protocol.class.cjs").AbstractScenarioPluginpackResolver } resolver 
     */
    constructor(resolver) {
        this.resolver = resolver

    }


    /**
     * 
     * @param {string[]} urls 
     */
    async load(urls) {
        for (const url of urls) {
            const resolvedPath = this.resolver.resolve(url)


        }

    }

}

module.exports = { PluginpackLoader }