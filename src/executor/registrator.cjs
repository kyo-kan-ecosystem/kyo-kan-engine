const deepmerge = require("deepmerge")

const { Registrater } = require("../util/registrater.cjs")

class ExecutorsRegistrator extends Registrater {
    /**
     * @type {{[k in string]:any}}
     */
    _plugins

    /**
     * @type {{[k in string]:import("./protocol").ExecutorConfigureFormatType}}
     */
    _configures

    constructor() {
        super()
        this._plugins = {}
        this._configures = {}


    }
    /**
     * @param {string | number} id
     * @param {any} plugin
     */
    registerPlugin(id, plugin) {
        this._plugins[id] = plugin
    }
    /**
     * @param {null} id
     * @param {import("./protocol").ExecutorConfigureFormatType<any>} configure
     */
    registerConfigure(id, configure) {
        let _id
        if (id === null || typeof id === 'undefined') {
            _id = this._generateId()
        }
        else {
            _id = id
        }
        this._configures[_id] = deepmerge({}, configure)
        return _id

    }
    /**
     * @param {string | number} pluginId
     * @param {any} configure
     */
    getSubworkflows(pluginId, configure) {
        const plugin = this._plugins[pluginId]
        return 'getSubworkflows' in plugin ? plugin.getSubworkflows(configure) : false


    }

    /**
     * @param {any?} id
     * @param {import("./protocol").ExecutorConfigureFormatType<any>} configure
     */
    registerAndCheckSubworflows(id, configure) {
        const _id = this.registerConfigure(id, configure)
        const subworkflows = this.getSubworkflows(configure.plugin, this._configures[_id])
        return {
            id: _id,
            subworkflows
        }

    }
    /**
     * @param {string | number} name
     * @param {string | number} configureId
     * @param {any} subworkflowId
     */
    linkToSubworkflow(name, configureId, subworkflowId) {
        const subworkflowMap = this._configures[configureId].subworkflowMap || {}
        subworkflowMap[name] = subworkflowId
        this._configures[configureId].subworkflowMap = subworkflowMap



    }




}


module.exports = { ExecutorsRegistrator }