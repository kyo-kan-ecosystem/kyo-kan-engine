



const deepmerge = require("deepmerge")
const { Context } = require("../../src/context/index.cjs")
const { DEFAULT_ENGINE_CONFIGURE } = require("../../src/engine/defaults/configure.cjs")
const { deepcopy } = require("../../src/util/deepcopy.cjs")
const { ResolverParseContext } = require("../../src/resolver/interfacade/parse_context.cjs")
const { isVoid } = require("../../src/util/is_void.cjs")






class Registrator {
    /**
     * @type {{[k in string]:{path:string, moduleName?:string}}}
     */
    executorPlugins
    /**
     * @type {{[k in string]:{path:string, moduleName?:string}}}
     */
    workflowPlugins
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
    constructor() {
        this.executorPlugins = {}
        this.workflowPlugins = {}
        this.executorPlugins = {}
        this.workflows = {}
        this.executors = {}
        this.boots = []

    }
    /**
     * 
     * @param {*} name 
     * @param {*} modulePath 
     * @param {*} name 
     */
    addExecutorPlugin(name, modulePath, moduleName = undefined) {
        this.executorPlugins[name] = { path: modulePath }
        if (isVoid(moduleName) === false) {
            this.executorPlugins[name].moduleName = moduleName
        }


    }
    /**
     * 
     * @param {*} name 
     * @param {*} modulePath 
     * @param {*} name 
     */
    addWorkflowPlugin(name, modulePath, moduleName = undefined) {
        this.executorPlugins[name] = { path: modulePath }
        if (isVoid(moduleName) === false) {
            this.executorPlugins[name].moduleName = moduleName
        }


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

module.exports = { Registrator }