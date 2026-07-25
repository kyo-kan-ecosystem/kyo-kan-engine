const { Repositry } = require("../../repositry/base.cjs")

/**
 * Repositry for workflow configure
 * @typedef {import("../protocol").WorkflowPluginConfigure} WorkflowPluginConfigure
 * @extends Repositry<WorkflowPluginConfigure>
 */
class WorkflowConfiguresRepositry extends Repositry { }

module.exports = { WorkflowConfiguresRepositry }