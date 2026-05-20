const { BootExecutorConfigureRepositry } = require("./repositry/boot.cjs")

const { ExecutorConfigureRepositry } = require("./repositry/configure.cjs")
const { ExecutorPluginRepositry } = require("./repositry/plugin.cjs")


const { ConfigureIdIsInvalidError, SubworkflowNameIsInvalidError, SubworkflowNameDoesNotExistsError, ConfigureDoesNotExistsError, PluginDoesNotExistsError, PlugidDoesNotSetInConfigureError } = require("./errors.cjs")

class ExecutorsContext {
    /**
     * @type {import("./repositry/configure.cjs").ExecutorConfigureRepositry}   
     *  */
    _pluginConfiguresRepositry

    /**
     * @type {ExecutorPluginRepositry}
     */
    _pluginsRepositry

    /**
     * @type {BootExecutorConfigureRepositry}
     */
    _bootConfigureRepositry

    /**
     * @param {Object} param0
     * @param {any?} [param0.plugins=null]
     * @param {import("./protocol").ExecutorConfigures?}[param0.configures=null]
     * @param {typeof ExecutorConfigureRepositry} [param0.configuresRepositryClass=ExecutorConfigureRepositry]
     * @param {typeof ExecutorPluginRepositry} [param0.pluginsRepositryClass=ExecutorPluginRepositry]
     * @param {typeof BootExecutorConfigureRepositry} [param0.bootPluginRepositryClass=BootExecutorConfigureRepositry]
     */
    constructor({ configures = null, plugins = null, configuresRepositryClass = ExecutorConfigureRepositry, pluginsRepositryClass = ExecutorPluginRepositry, bootPluginRepositryClass = BootExecutorConfigureRepositry } = {}) {


        this._pluginConfiguresRepositry = new configuresRepositryClass(configures?.plugins)
        this._pluginsRepositry = new pluginsRepositryClass(plugins)
        this._bootConfigureRepositry = new bootPluginRepositryClass(configures?.boots)



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
        const subWorkflowMap = this.getOptions(configureId).subworkflowMap || {}
        if (name in subWorkflowMap === false) {
            throw new SubworkflowNameDoesNotExistsError(name)
        }

        return subWorkflowMap[name]




    }
    /**
     * @param {any} configureId
     * @returns {import("./protocol").ExecutorConfigureFormatType}
     */
    getOptions(configureId) {
        const configure = this._pluginConfiguresRepositry.get(configureId)
        if (configure === null || typeof configure === 'undefined') {
            throw new ConfigureDoesNotExistsError(configureId)
        }
        return configure
    }
    /**
     * @param {any} pluginId
     * @returns
     */
    getExecutorPlugin(pluginId) {
        const plugin = this._pluginsRepositry.get(pluginId)
        if (plugin === null || typeof plugin === 'undefined') {
            throw new PluginDoesNotExistsError(pluginId)
        }
        return plugin
    }
    /**
     * @param {any} configureId
     */
    getOptionsAndExecutor(configureId) {

        const options = this.getOptions(configureId) || {}
        if ('plugin' in options.plugin === false || options.plugin === null) {
            throw new PlugidDoesNotSetInConfigureError(configureId, options)

        }

        const executor = this.getExecutorPlugin(options.plugin)
        return { options, executor }



    }
    getInitData() {
        const plugins = this._pluginsRepositry
        /**
         * @type {import("./protocol").ExecutorConfigures}
         */
        const configures = {}
        configures.plugins = this._pluginsRepositry.getDatas()
        configures.boots = this._bootConfigureRepositry.getDatas()
        return { plugins, configures }

    }
    getBootPlugins() {
        /**
         * @type {{options:any, executor:any}[]}
         */
        const results = []
        const bootPluginConfigures = this._bootConfigureRepositry.getDatas()
        for (const configure of bootPluginConfigures) {
            const executor = this.getExecutorPlugin(configure.plugin)
            results.push({ options: configure.options, executor })
        }
        return results


    }
    /**
     * @param {any} configureId
     * @param {string | number} subworkflowName
     */
    getSubworkflowId(configureId, subworkflowName) {
        const configure = this.getOptions(configureId)
        if (!configure.subworkflowMap || subworkflowName in configure.subworkflowMap === false) {

            throw new SubworkflowNameDoesNotExistsError(subworkflowName)

        }
        return configure.subworkflowMap[subworkflowName]


    }
}
module.exports = {
    ExecutorsContext
}