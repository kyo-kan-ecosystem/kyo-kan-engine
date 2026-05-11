const { Stack } = require("../util/stack/stack.cjs");

/**
 * @extends {Stack<import("./bords.protocol").BordsProtocol>}
 */
class BordsBranch extends Stack { }


module.exports = { BordsBranch }