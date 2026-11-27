const { ContextNotFoundError } = require("./error.cjs")

class Controller {
    /**
     * @type {import("../../src/context/store/protocol").ContextStore}
     */
    contextStore


    /**
     * @type {import("./protocol").ScenarioLoader}
     * 
     * 
     */
    sceanrioLoader

    /**
     * @param {import("../../src/context/store/protocol").ContextStore} contextStore
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
     * @param {*} contextId  
     */
    async runFromScenarioId(id, contextId, request, api = {}) {

        const context = await this._getContetxtFromScenario(id, request, api)
        await this.contextStore.set(contextId, { context, scenarioId: id })
        return await this._run(context, request)
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
        const context = this._getContext(id, request, api)
        return this._run(context, request)

    }
    /**
     * 
     * @param {*} id 
     * @param {*} request 
     * @param {*} api 
     */
    async _getContext(id, request, api) {
        const res = await this.contextStore.get(id)
        if (res.isExist === false) {
            throw new ContextNotFoundError(id)
        }
        const context = res.value?.context
        context?.setApi(api)
        return context

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