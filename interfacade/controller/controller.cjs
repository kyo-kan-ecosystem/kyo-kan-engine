class Controller {
    /**
     * @type {import("./protocol").ContextStore}
     */
    contextStore


    /**
     * @type {import("./protocol").ScenarioLoader}
     * 
     * 
     */
    sceanrioLoader

    /**
     * @param {import("./protocol").ContextStore} contextStore
     * @param {import("./protocol").ScenarioLoader} scenarioLoader
     */
    constructor(contextStore, scenarioLoader) {
        this.sceanrioLoader = scenarioLoader
        this.contextStore = contextStore

    }


    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     */
    runFromScenarioId(id, request, api = {}) {
        const context = this._getContetxtFromScenario(id, request, api)
    }
    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     */
    _getContetxtFromScenario(id, request, api) { }
    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     * @returns 
     */
    runContext(id, request, api = {}) {
        const context = this._getContextFromState(id, request, api)
        return this._run(context, request)

    }
    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     */
    _getContextFromState(id, request, api) {
        const scenario = this.sceanrioLoader.load(id)

    }
    /**
     * 
     * @param {*} context 
     * @param {*} request 
     */
    async _run(context, request) {

    }


}


module.exports = { Controller }