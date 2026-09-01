const { EngineConfigureRepositry } = require("./repositry/configure.cjs")
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
    constructor({ configureClass = EngineConfigureRepositry, configureInit = undefined } = {}) {
        this.configure = new configureClass(configureInit)


    }
    getSerializableData() {
        return { configureInit: this.configure.getSerializableData() }
    }

}

module.exports = { EngineContext }