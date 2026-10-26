



const { ScenarioPluginPack } = require('./pluginpack/pluginpack.cjs')






class Scenario {

    /**
     * @type {any?}
     */
    root
    /**
     * @type {{[k in string]:any}}
     */
    workflows

    /**
     * @type {{[k in string]:any}}
     */
    executors

    /**
     * @type {any[]}
     */
    boots

    /**
     * @type {ScenarioPluginPack}
     */
    pluginPack

    /**
     * @type {ScenarioPluginPack[]}
     */
    pluginPacks
    /**
     * 
     * @param {ScenarioPluginPack[]} pluginPacks 
     * @param {typeof ScenarioPluginPack} pluginPackClass 
     */
    constructor(pluginPacks = [], pluginPackClass = ScenarioPluginPack) {
        this.executorPlugins = {}
        this.workflowPlugins = {}
        this.executorPlugins = {}
        this.workflows = {}
        this.executors = {}
        this.boots = []
        this.pluginPack = new pluginPackClass()
        this.pluginPacks = pluginPacks


    }

    /**
     * 
     * @param {*} configure 
     */
    setRoot(configure) {
        this.root = configure

    }
    /**
     * 
     * @param {*} name 
     * @param {*} configure 
     */
    addNamedWorkflow(name, configure) {
        this.workflows[name] = configure

    }
    /**
     * 
     * @param {*} name 
     * @param {*} configure 
     */
    addNamedExecutor(name, configure) {
        this.executors[name] = configure

    }
    /**
     * 
     * @param {*} configure 
     */
    addBoot(configure) {
        this.boots.push(configure)
    }
    getJSONString() {
        return JSON.stringify(this)

    }









}

module.exports = { Scenario }

const t = Object.assign({ a: 1 }, require('./pluginpack/pluginpack.cjs'))

module.exports.t = t