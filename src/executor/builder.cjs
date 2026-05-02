const { BootExecutorConfigureRepositry } = require("./repositry/boot.cjs")

const { ExecutorPluginRepositry } = require("./repositry/plugin.cjs")

/**
 * @template {ExecutorPluginRepositry} [PluginRepositryClass=ExecutorPluginRepositry]
 */
class ExecutorBuilder {
    /**
     * @type {PluginRepositryClass}
     */
    plugins

    /**
     * 
     */

    /**
     * 
     */

    /**
     * @param {Object} [param0={}] 
     * @param {any} [param0.pluginRepositryClass=ExecutorPluginRepositry] 
     * @param {any} [param0.bootRepositryClass=BootExecutorConfigureRepositry] 
     *
     */
    constructor({ pluginRepositryClass = ExecutorPluginRepositry, bootRepositryClass = BootExecutorConfigureRepositry } = {}) {
        this.plugins = new pluginRepositryClass()


    }
}