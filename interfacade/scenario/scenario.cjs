const { isVoid } = require('../../src/util/is_void.cjs')











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
        const pluginPacks = []
        for (const pluginPack of this.pluginPacks) {
            /**
             * @type {import("./protocol.d.ts").ScenarioPluginPackUrlFormat}
             */
            const pluginPackURL = { url: pluginPack.url }
            if (isVoid(pluginPack.packageModuleName) === false) {
                pluginPackURL.packageModuleName = pluginPack.packageModuleName
            }
            pluginPacks.push(pluginPackURL)

        }
        /**
         * @type {Object<any, any>}
         */
        const seriaraizeData = { pluginPacks }
        for (const key in this) {
            if (key.indexOf('_') === -1) {
                continue
            }
            if (key === 'pluginPacks') {
                continue
            }
            const property = this[key];
            seriaraizeData[key] = property


        }
        return seriaraizeData


    }









}

module.exports = { Scenario }

const t = Object.assign({ a: 1 }, require('./pluginpack/pluginpack.cjs'))

module.exports.t = t