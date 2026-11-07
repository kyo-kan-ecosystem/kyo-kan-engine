
const { isVoid, dynamicDefault } = require('../../../src/util/is_void.cjs')

class ScenarioPluginPack {
    /**
     * @type {import("./protocol").PluginPackageDataTypes}
     */
    executors
    /**
     * @type {import("./protocol").PluginPackageDataTypes}
     */
    workflows


    /**
     * @type {string}
     */
    url

    /**
     * @type {string | undefined} 
     */
    packageModuleName

    /**
     * @type {string | undefined}
     */

    basedire
    /**
     * @param {Object} param0 
     * @param {string |undefined} [param0.modulePath=undefined]
     * @param {string} [param0.url='']
     * @param {string | undefined} [param0.basedir=undefined]
     * @param {string} [param0.packageModuleName]
     * 
     * 
     */
    constructor({ modulePath = undefined, url = '', packageModuleName = undefined, basedir = undefined }) {
        this.executors = {}
        this.workflows = {}
        this.modulePath = modulePath
        this.url = url
        this.basedire = basedir
        this.packageModuleName = packageModuleName



        this._isEmpty = true


    }

    /**
     * @param {Object} param0 
     * @param {string} param0.id 
     * @param {string | undefined} [param0.modulePath=undefined] 
     * @param {string | undefined} [param0.moduleName=undefined] 
     * 
     */
    addExecutorPlugin({ id, modulePath = undefined, moduleName = undefined }) {
        this._isEmpty = false
        this.executors[id] = { modulePath: dynamicDefault(modulePath, this.modulePath) }
        if (isVoid(moduleName) === false) {
            this.executors[id].moduleName = moduleName
        }


    }
    /**
     * @param {string | number} id
     * @param {import('../../../protocol/plugin/protocol.js').PluginManager} manager
    */
    addExecutorPluginManager(id, manager) {
        this.workflows[id] = { manager }

    }

    /**
     * @param {Object} param0 
     * @param {string} param0.id 
     * @param {string | undefined} [param0.modulePath=undefined] 
     * @param {string | undefined} [param0.moduleName=undefined] 
     * 
     */
    addWorkflowPlugin({ id, modulePath = undefined, moduleName = undefined }) {
        this._isEmpty = false
        this.workflows[id] = { modulePath: dynamicDefault(modulePath, this.modulePath) }
        if (isVoid(moduleName) === false) {
            this.workflows[id].moduleName = moduleName
        }


    }


    /**
     * @param {string | number} id
     * @param {import('../../../protocol/plugin/protocol.js').PluginManager} manager
     */
    addWorkflowPluginManager(id, manager) {
        this.workflows[id] = { manager }

    }
    checkIsEmpty() {
        return this._isEmpty
    }
    getWorkflows() {
        return this.workflows

    }
    /**
     * 
     */
    getExecutors() {
        return this.executors
    }
}

module.exports = { ScenarioPluginPack }