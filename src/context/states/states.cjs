
const { StackTree } = require('../../util/stack.cjs');
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
    getMode() {
        return this.get().mode
    }
    goSub() {
        this.push({})
    }
    returnFromSub() {
        return this.pop()
    }
}


module.exports = { States }