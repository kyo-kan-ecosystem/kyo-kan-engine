
const { Stack } = require("../util/stack/stack.cjs");

/**
 * @extends {Stack<import("./bords.protocol").BordsProtocol>}
 */
class BordsBranch extends Stack {
    /**
     * @param {any} digg
     */
    getWorkflow(digg = 0) {
        return this.get(digg).workflow
    }
    /**
     * @param {any} workflow
     */
    updateWorkflow(workflow) {
        return this.update({ workflow }, false)
    }
}


module.exports = { BordsBranch }