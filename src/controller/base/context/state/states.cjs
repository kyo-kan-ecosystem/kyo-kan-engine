
const { StackTree } = require('../../../../util/stack.cjs');
const { StateBranch } = require('./states_branch.cjs')

/**
 * @extends {StackTree<StateBranch>}
 */
class States extends StackTree {
    splitTree(splitCount) {
        const results = super.splitTree(splitCount)
        this.getNode().addLinkedCount(splitCount)
        return results

    }
}

module.exports = { States }