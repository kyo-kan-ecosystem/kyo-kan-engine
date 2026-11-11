class Controller {
    /**
     * @type {import("./protocol").StateLoader}
     */
    stateLoader


    /**
     * @type {import("./protocol").ScenarioLoader}
     * 
     * 
     */
    sceanrioLoader

    /**
     * @param {import("./protocol").StateLoader} stateLoader
     * @param {import("./protocol").ScenarioLoader} scenarioLoader
     */
    constructor(stateLoader, scenarioLoader) {
        this.sceanrioLoader = scenarioLoader
        this.stateLoader = stateLoader

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
    runFromState(id, request, api = {}) {
        const context = this._getContetxtFromState(id, request, api)
        return this._run(context, request)

    }
    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     */
    _getContetxtFromState(id, request, api) {
        const scenario = this.sceanrioLoader

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