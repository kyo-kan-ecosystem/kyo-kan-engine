const { Stack } = require("../../util/stack.cjs");

/**
 * @extends {Stack<import("../../controller/protocol").StateType>}
 */
class StateBranch extends Stack { }

module.exports = { StateBranch }