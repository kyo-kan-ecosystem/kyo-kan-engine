class AbstractScenarioPluginpackResolver {
    /**
     * @abstract
     * @param {string} url
     * @returns {string} 
     */
    resolve(url) {
        throw 'Not implemnted'
    }

}
module.exports = { AbstractScenarioPluginpackResolver }