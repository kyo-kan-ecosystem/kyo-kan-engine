
const { StackTree } = require('../../util/stack/stack.cjs');
const { StateBranch } = require('./branch.cjs');


/**
 * 
 * @extends {StackTree<StateBranch, import('../../controller/protocol').State>} 
 *
 */
class States extends StackTree {

    constructor(initData = null, id, branchClass = StateBranch) {
        super(initData, id, branchClass)

    }
    getExecuteMode() {
        return (this.get() || {}).controlls?.executeMode
    }
    goSub() {
        this.push({})
    }
    returnFromSub() {
        return this.pop()
    }
}


module.exports = { States }