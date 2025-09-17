
const { StackTree } = require('../../../../util/stack.cjs');
const { StateBranch } = require('./states_branch.cjs')

/**
 * @extends {StackTree<StateBranch>}
 */
class States extends StackTree { }

module.exports = { States }