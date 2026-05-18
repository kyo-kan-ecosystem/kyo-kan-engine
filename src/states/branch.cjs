const { Stack } = require("../util/stack/stack.cjs");

/**
 * @extends {Stack<import("./protocol").StateType>}
 */
class StateBranch extends Stack { }

module.exports = { StateBranch }