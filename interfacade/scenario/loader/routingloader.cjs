const { LoaderForNamespaceDoesNotExistError }  "./error.cjs"

/**
 * @typedef {import("./protocol").ScenarioLoaderInterFace} ScenarioLoaderInterFace
 * @implements {ScenarioLoaderInterFace}
 */
class RoutingLoader {
    /**
     * @type {{[k in string]:ScenarioLoaderInterFace}}
     */
    loaderMap


    constructor(loaderMap = {}) {
        this.loaderMap = loaderMap


    }
    /**
     * @param {import("./protocol").ScenarioID} scenarioId
     */
    async loadContext(scenarioId) {
        if (scenarioId.nameSpace in this.loaderMap === false) {

            throw new LoaderForNamespaceDoesNotExistError()
        }
        return await this.loaderMap[scenarioId.nameSpace].loadContext(scenarioId)

    }
    async loa
}

module.exports = { RoutingLoader }