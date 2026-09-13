const { KeyValueRepositry } = require("../../repositry/key_value.cjs")


/**
 * @extends {KeyValueRepositry<import("./protocol").EngineConfigure>}
 */
class EngineConfigureRepositry extends KeyValueRepositry { }

module.exports = { EngineConfigureRepositry }