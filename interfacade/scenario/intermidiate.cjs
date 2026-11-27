const { Context } = require("../../src/index.cjs")



class ScenarioIntermidiate {
    /**
     * @type {any}
     */
    root
    /**
     * @type {any}
     */
    executors
    /**
     * @type {any}
     */
    workflows
    /**
     * @type {any}
     */
    boots
    /**
     * @type {any}
     */
    pluginBuindings
    /**
     * @type {any}
     */
    datas
    /**
     * @type {typeof Context.Class}
     */
    contextClass
    /**
     * 
     * @param {*} param0 1
     *       
     */
    constructor({ executors, workflows, root, pluginBuindings, datas, contextClass = Context.Class }) {
        this.root = root
        this.executors = executors
        this.workflows = workflows
        this.pluginBuindings = pluginBuindings
        this.datas = datas
        this.contextClass = contextClass

    }
    /**
     * 
     * @param {*} scenarioPath 
     */
    getScenarioData(scenarioPath) {

    }
    /**
     * 
     * @param {*} api 
     */
    getContext(api) {

        const context = new this.contextClass({ datas: this.datas, api })
        context



    }
}

module.exports = { ScenarioIntermidiate }