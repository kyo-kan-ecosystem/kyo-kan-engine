const { DEFAULT_ENGINE_CONFIGURE } = require("./defaults/configure.cjs")
const { EngineConfigureRepositry } = require("./repositry/configure.cjs")
const deepmerge = require('deepmerge')

/**
 * 
 * 
 * @template {{getSerializableData:any}} [EngineConfigureRepositryType=EngineConfigureRepositry]
 */
class EngineContext {
    /**
     * @type {EngineConfigureRepositryType}
     */
    configure
    /**
     * @param {import("./protocol").EngineContextInit} param0 
     * 
     */
    constructor({ configureClass = EngineConfigureRepositry, configureInit = {} } = {}) {
        const _configureInit = deepmerge(DEFAULT_ENGINE_CONFIGURE, configureInit)
        this.configure = new configureClass(_configureInit)


    }
    getSerializableData() {
        return { configureInit: this.configure.getSerializableData() }
    }

}

module.exports = { EngineContext }