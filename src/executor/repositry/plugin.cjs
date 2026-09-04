const { Repositry } = require("../../repositry/base.cjs")

/**
 * @typedef {import("../../../protocol").MaybeWithGetSubworkflow} MaybeWithGetSubworkflow
 * @extends Repositry<MaybeWithGetSubworkflow>
 */
class ExecutorPluginRepositry extends Repositry { }
module.exports = { ExecutorPluginRepositry }