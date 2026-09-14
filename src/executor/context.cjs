const { BootExecutorConfigureRepositry } = require("./repositry/boot.cjs")

const { ExecutorConfigureRepositry } = require("./repositry/configure.cjs")
const { ExecutorPluginRepositry } = require("./repositry/plugin.cjs")


const { SubworkflowNameDoesNotExistsError, ConfigureDoesNotExistsError, PluginDoesNotExistsError, PlugidDoesNotSetInConfigureError, ConfigureIdIsInvalidError } = require("./errors.cjs")
const { assertIsNotVoid, isVoid } = require("../util/is_void.cjs")


class ExecutorsContext {
    /**
     * @type {import("./repositry/configure.cjs").ExecutorConfigureRepositry}   
     *  */
    pluginConfigures

    /**
     * @type {ExecutorPluginRepositry}
     */
    plugins

    /**
     * @type {BootExecutorConfigureRepositry}
     */
    bootConfigures

    /**
     * @param {Object} param0
     * @param {any?} [param0.plugins=null]
     * @param {import("./protocol").ExecutorConfigures?}[param0.configures=null]
     * @param {typeof ExecutorConfigureRepositry} [param0.configuresRepositryClass=ExecutorConfigureRepositry]
     * @param {typeof ExecutorPluginRepositry} [param0.pluginsRepositryClass=ExecutorPluginRepositry]
     * @param {typeof BootExecutorConfigureRepositry} [param0.bootPluginRepositryClass=BootExecutorConfigureRepositry]
     */
    constructor({ configures = null, plugins = null, configuresRepositryClass = ExecutorConfigureRepositry, pluginsRepositryClass = ExecutorPluginRepositry, bootPluginRepositryClass = BootExecutorConfigureRepositry } = {}) {


        this.pluginConfigures = new configuresRepositryClass(configures?.plugins)
        this.plugins = new pluginsRepositryClass(plugins)
        this.bootConfigures = new bootPluginRepositryClass(configures?.boots)



    }

    /**
     * @param {any} configureId
     * @returns {import("./protocol").ExecutorConfigureProtocol}
     */
    getConfigure(configureId) {
        assertIsNotVoid(configureId, ConfigureIdIsInvalidError)
        /**
         * @type {import("./protocol").ExecutorConfigureProtocol}
         */
        const configure = this.pluginConfigures.get(configureId)
        assertIsNotVoid(configure, ConfigureDoesNotExistsError)




        return configure
    }
    /**
     * @param {any} pluginId
     * @returns
     */
    getExecutorPlugin(pluginId) {
        const plugin = this.plugins.get(pluginId)
        if (plugin === null || typeof plugin === 'undefined') {
            throw new PluginDoesNotExistsError(pluginId)
        }
        return plugin
    }
    /**
     * @param {any} configureId
     * 
     */
    getOptionsAndExecutor(configureId) {

        const configure = this.getConfigure(configureId) || {}

        const plugin = configure.plugin
        assertIsNotVoid(plugin, PlugidDoesNotSetInConfigureError, { configureId, plugin })
        const executor = this.getExecutorPlugin(configure.plugin)
        return { options: configure.options, executor }



    }
    getInitData() {
        const plugins = this.plugins
        /**
         * @type {import("./protocol").ExecutorConfigures}
         */
        const configures = {}
        configures.plugins = this.plugins.getDatas()
        configures.boots = this.bootConfigures.getDatas()
        return { plugins, configures }

    }
    getBootPlugins() {
        /**
         * @type {{options:any, executor:any}[]}
         */
        const results = []
        const bootPluginConfigureIDs = this.bootConfigures.getDatas()
        for (const configureID of bootPluginConfigureIDs) {


            results.push({ options: this.pluginConfigures.get(configureID).options, executor: this.getExecutorPlugin() })
        }
        return results


    }

}
module.exports = {
    ExecutorsContext
}