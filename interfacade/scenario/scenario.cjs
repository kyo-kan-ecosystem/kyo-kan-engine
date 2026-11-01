










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
     * @type {import('./pluginpack/pluginpack.cjs').ScenarioPluginPack[]}
     */
    pluginPacks
    /**
     * 
     * @param {import('./pluginpack/pluginpack.cjs').ScenarioPluginPack[]} pluginPacks 
     *  
     */
    constructor(pluginPacks = []) {
        this.executorPlugins = {}
        this.workflowPlugins = {}
        this.executorPlugins = {}
        this.workflows = {}
        this.executors = {}
        this.boots = []

        this.pluginPacks = pluginPacks.concat([])


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
    getSeriaraizableData() {
        const pluginPacksMap = new Map()
        for (const pluginPack of this.pluginPacks) {
            pluginPacksMap.set(pluginPack.url, true)

        }
        const plug
        for (const key in this) {
            if (key.indexOf('_') === -1) {
                continue
            }
            if (key === 'pluginPacks') {
                continue
            }
            const property = this[key];


        }
        return JSON.stringify(this)

    }









}

module.exports = { Scenario }

const t = Object.assign({ a: 1 }, require('./pluginpack/pluginpack.cjs'))

module.exports.t = t