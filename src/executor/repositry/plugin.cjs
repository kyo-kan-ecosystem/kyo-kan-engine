const { Repositry } = require("../../repositry/base.cjs")

/**
 * @typedef {import("../../../protocol/index.protocol").MaybeWithProcessConfigure} MaybeWithGetSubworkflow
 * @extends Repositry<MaybeWithGetSubworkflow >
 */
class ExecutorPluginRepositry extends Repositry { }
module.exports = { ExecutorPluginRepositry }