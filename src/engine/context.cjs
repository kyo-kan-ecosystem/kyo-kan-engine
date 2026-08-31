const { EngineConfigureRepositry } = require("./repositry/configure.cjs")

class EngineContext {
    /**
     * @type {EngineConfigureRepositry}
     */
    configure
    /**
     * 
    
     */
    constructor({ configureClass = EngineConfigureRepositry, configureInit = undefined }) {
        this.configure = new configureClass(configureInit)


    }

}
module.exports = { EngineContext }