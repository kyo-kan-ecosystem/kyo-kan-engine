const { Context } = require("../../../src/index.cjs")

class ScenarioIntermidiateExpression {
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
     * @type {import('../plugins/bundle/class.cjs').PluginBundle}
     */
    pluginBundle
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
    constructor({ executors, workflows, root, boots, pluginBundle, datas, contextClass = Context.Class }) {
        this.root = root
        this.executors = executors
        this.workflows = workflows
        this.pluginBundle = pluginBundle
        this.datas = datas
        this.contextClass = contextClass
        this.boots = boots

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

module.exports = { ScenarioIntermidiateExpression }