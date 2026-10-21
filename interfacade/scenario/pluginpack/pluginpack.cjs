const crypto = require("crypto")
const { isVoid } = require('../../../src/util/is_void.cjs')


class ScenarioPluginPack {
    /**
     * @type {{[k in string]:{path:string, moduleName?:string}}}
     */
    executors
    /**
     * @type {{[k in string]:{path:string, moduleName?:string}}}
     */
    workflows
    /**
     * @type {string}
     */
    name
    /**
     * @type {boolean}
     */
    _isEmpty
    /**
     * 
     * @param {string | undefined} [name=undefined] 
     */
    constructor(name = undefined) {
        this.executors = {}
        this.workflows = {}

        // @ts-ignore
        this.name = isVoid(name) === true ? crypto.randomUUID() : name
        this._isEmpty = true


    }

    /**
     * 
     * @param {*} name 
     * @param {*} modulePath 
     * @param {*} name 
     */
    addExecutorPlugin(name, modulePath, moduleName = undefined) {
        this._isEmpty = false
        this.executors[name] = { path: modulePath }
        if (isVoid(moduleName) === false) {
            this.executors[name].moduleName = moduleName
        }


    }
    /**
     * 
     * @param {*} name 
     * @param {*} modulePath 
     * @param {*} name 
     */
    addWorkflowPlugin(name, modulePath, moduleName = undefined) {
        this._isEmpty = false
        this.executors[name] = { path: modulePath }
        if (isVoid(moduleName) === false) {
            this.executors[name].moduleName = moduleName
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
}

module.exports = { ScenarioPluginPack }