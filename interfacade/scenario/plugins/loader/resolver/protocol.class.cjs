class AbstractScenarioPluginpackResolver {
    /**
     * @abstract
     * @param {string} url
     * @returns {import("./protocol").ResolveResult | false} 
     */
    resolve(url) {
        throw 'Not implemnted'
    }

}



module.exports = { AbstractScenarioPluginpackResolver }