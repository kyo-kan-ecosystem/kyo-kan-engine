
const { isVoid, dynamicDefault } = require('../../../src/util/is_void.cjs')

class ScenarioPluginPack {
    /**
     * @type {{[k in string]: import("./protocol.d.ts").PluginPackageConfigureType}}
     */
    executors
    /**
     * @type {{[k in string]: import("./protocol.d.ts").PluginPackageConfigureType}}
     */
    workflows

    /**
     * @type {boolean}
     */
    _isEmpty

    modulePath
    /**
     * @type {string | undefined}
     */

    url

    /**
     * @type {string | undefined}
     */

    basedire
    /**
     * @param {Object} param0 
     * @param {string |undefined} [param0.modulePath=undefined]
     * @param {string | undefined} [param0.url=undefined]
     * @param {string | undefined} [param0.basedir=undefined]
     * 
     * 
     */
    constructor({ modulePath = undefined, url = undefined, basedir = undefined }) {
        this.executors = {}
        this.workflows = {}
        this.modulePath = modulePath
        this.url = url
        this.basedire = basedir



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
    checkIsEmpty() {
        return this._isEmpty
    }
    getSeriaraizableData() {
        const ret = {}
        for (const key in this) {
            /**
             * @type {any}
             */
            const element = this[key]
            if (key.indexOf('_') === 0 || typeof element === 'function') {
                continue
            }
            // @ts-ignore
            ret[key] = element





        }
        return ret
    }
    getWorkflows() {
        return this.workflows

    }
    /**
     * 
     * @returns {{[k in string]: import("./protocol.d.ts").PluginPackageConfigureType}}
     */
    getExecutors() {
        return this.executors
    }
}

module.exports = { ScenarioPluginPack }