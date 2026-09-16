const { Repositry } = require("../../repositry/base.cjs")

/**
 * Repositry for workflow configure
 * @typedef {import("../protocol").WorkflowConfigure} WorkflowConfigure
 * @extends Repositry<WorkflowConfigure>
 */
class WorkflowConfiguresRepositry extends Repositry { }

module.exports = { WorkflowConfiguresRepositry }