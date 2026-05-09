

const { ConfigureIdIsInvalidError, SubworkflowNameIsInvalidError, SubworkflowNameDoesNotExistsError, ConfigureDoesNotExistsError, PluginDoesNotExistsError, PlugidDoesNotSetInConfigureError } = require("./errors.cjs")

class ExecutorsContext {
    /**
     * @type {import("./repositry/configure.cjs").ExecutorConfigureRepositry}   
     *  */
    _configuresRepositry

    /**
     * @type {import("./repositry/plugin.cjs").ExecutorPluginRepositry}
     */
    _pluginsRepositry
    /**
     * @param {import("./repositry/configure.cjs").ExecutorConfigureRepositry} configuresRepositry
     * @param {import("./repositry/plugin.cjs").ExecutorPluginRepositry} pluginsRepositry
     */
    constructor(configuresRepositry, pluginsRepositry) {
        this._configuresRepositry = configuresRepositry
        this._pluginsRepositry = pluginsRepositry

    }
    /**
     * @param {any} configureId
     * @param {any} name
     */
    resolveSubworkflowId(configureId, name) {
        if (configureId === null || typeof configureId === 'undefined') {
            throw new ConfigureIdIsInvalidError(configureId)
        }
        if (name === null || typeof name === 'undefined') {
            throw new SubworkflowNameIsInvalidError(name)
        }
        const subWorkflowMap = this.getConfigure(configureId).subworkflowMap || {}
        if (name in subWorkflowMap === false) {
            throw new SubworkflowNameDoesNotExistsError(name)
        }

        return subWorkflowMap[name]




    }
    /**
     * @param {any} configureId
     * @returns {import("./protocol").ExecutorConfigureFormatType}
     */
    getConfigure(configureId) {
        const configure = this._configuresRepositry.get(configureId)
        if (configure === null || typeof configure === 'undefined') {
            throw new ConfigureDoesNotExistsError(configureId)
        }
        return configure
    }
    /**
     * @param {any} pluginId
     * @returns
     */
    getPlugin(pluginId) {
        const plugin = this._pluginsRepositry.get(pluginId)
        if (plugin === null || typeof plugin === 'undefined') {
            throw new PluginDoesNotExistsError(pluginId)
        }
        return plugin
    }
    /**
     * @param {any} configureId
     */
    getConfigureAndPlugin(configureId) {

        const configure = this.getConfigure(configureId) || {}
        if (configure.plugin === null || 'plugin' in configure.plugin === false) {
            throw new PlugidDoesNotSetInConfigureError(configureId, configure)

        }

        const plugin = this.getPlugin(configure.plugin)
        return { configure, plugin }



    }
}
module.exports = {
    ExecutorsContext
}