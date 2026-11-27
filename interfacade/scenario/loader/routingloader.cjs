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

    /**
     * 
     * @param {*} interMidiateStore 
     * @param {*} compiler  
     * @param {*} loaderMap 
     */
    constructor(interMidiateStore, compiler, loaderMap = {},) {
        this.loaderMap = Object.assign({}, loaderMap)

        this.interMidiateStore = interMidiateStore
        this.compiler = compiler


    }
    /**
     * @param {any} ScenarioID
     */
    async loadPlugins(ScenarioID) {


    }
    /**
     * @param {any} ScenarioID
     */
    async loadScenario(ScenarioID) {
        throw new Error("Method not implemented.")
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
    /**
     * @param {import("./protocol").ScenarioID} scenarioId
     */
    _generateId(scenarioId) {
        return `${scenarioId.nameSpace}:${scenarioId.id}`

    }

}

module.exports = { RoutingLoader }