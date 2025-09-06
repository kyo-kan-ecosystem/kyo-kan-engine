const { }

class ControllerContext {
    constructor(state, pluginMap) {
        this.state = state
        this.pluginMap = pluginMap
    }

    save() {
        return JSON.stringify(self.state)
    }
}
const INITIAL_WORKFLOW = ''

class Controller {
    /**
     * 
     * @param {{execute:any, workflow:any}} pluginData 
     * @param {*} workflowRepositryContextClass 
     * @param {*} pluginRepositryClass 
     * @param {{initial}} options 
     */
    constructor(pluginData, workflowRepositryContextClass, pluginRepositryClass) {

        this.workflowRepositry = new workflowRepositryContextClass()
        this.pluginRepositry = new pluginRepositryClass()

    }
    setWorklow
    /**
     * 
     * @param {any} request 
     * @param {*} context 
     */
    exec(request, context) {

    }
}