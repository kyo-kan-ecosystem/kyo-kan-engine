
const { StackTree } = require('../../util/stack/stack.cjs');
const { StateBranch } = require('./branch.cjs');
const { ControllState } = require('./controll_state.cjs')


/**
 * @template {ControllState} ControllStateType
 * @extends {StackTree<import('../../controller/protocol').State, StateBranch>} 
 *
 */
class States extends StackTree {
    /**
     * @type {ControllState}
     */
    controll
    /**
     * 
     * @param {*} initData 
     * @param {*} id 
     * @param {*} branchClass 
     * @param {*} controllClass 
     */
    constructor(initData = null, id = null, branchClass = StateBranch, controllClass = ControllState) {
        super(initData, id, branchClass)
        this.controll = new controllClass(this)



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

/**
 * @typedef {States<ControllState>} StatesType
 */
module.exports = { States }