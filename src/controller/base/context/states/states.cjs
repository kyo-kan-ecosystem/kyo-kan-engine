
const { StackTree } = require('../../../../util/stack.cjs');
const { StateBranch } = require('./states_branch.cjs');


/**
 * @extends {StackTree<StateBranch, import('../../../protocol').State | null>}
 */
class States extends StackTree {
    constructor(initData = null) {
        super(initData, StateBranch)
        if (initData === null) {
            this.push(null)

        }
    }
    goSub() {
        this.push({})
    }
    returnFromSub() {
        return this.pop()
    }
}


module.exports = { States }