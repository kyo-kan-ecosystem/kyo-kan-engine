const { Repositry } = require("../../repositry/base.cjs")

/**
 * Repositry for workflow configure
 * 
 * @extends {Repositry<import("../protocol").WorkflowPluginConfigure>}
 */
class WorkflowConfiguresRepositry extends Repositry { }

module.exports = { WorkflowConfiguresRepositry }