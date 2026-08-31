const { KeyValueRepositry } = require("../../repositry/key_value.cjs")

const { DEFAULT_ENGINE_CONFIGURE } = require('../defaults/configure.cjs')
/**
 * @extends {KeyValueRepositry<import("./protocol").EngineConfigure>}
 */
class EngineConfigureRepositry extends KeyValueRepositry {
    /**
     * 
     * @param {import("./protocol").EngineConfigure} [defaults = DEFAULT_ENGINE_CONFIGURE]
     */
    constructor(defaults = DEFAULT_ENGINE_CONFIGURE) {
        super(defaults)

    }
}

module.exports = { EngineConfigureRepositry }