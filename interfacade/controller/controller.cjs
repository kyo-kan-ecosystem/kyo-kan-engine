class Controller {
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