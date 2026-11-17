const { Stack } = require("../util/stack/classes.cjs");

/**
 * @extends {Stack<import("./protocol").StateType>}
 */
class StateBranch extends Stack { }

module.exports = { StateBranch }