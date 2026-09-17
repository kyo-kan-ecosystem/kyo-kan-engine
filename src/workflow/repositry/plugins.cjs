const { Repositry } = require("../../repositry/base.cjs")
/**
 * @extends {Repositry<import('../plugin/protocol.class.cjs').AbstractWorkflow>}
 */
class WorkflowPluginRepositry extends Repositry { }

module.exports = { WorkflowPluginRepositry }