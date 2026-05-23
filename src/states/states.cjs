
const { StackTree } = require('../util/stack/stack.cjs');
const { StateBranch } = require('./branch.cjs');
const { ControllState } = require('./controll_state.cjs')


/**
 * @template {ControllState} [ControllStateType=ControllState]
 * @extends {StackTree<StateBranch>} 
 *
 */
class States extends StackTree {
    /**
     * @type {ControllStateType}
     */
    controll


    /**
     * @type {boolean}
     */

    _isBoot
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

        this._isBoot = false




    }
    isStart() {
        return this._isStart

    }
    setNotStart() {
        this._isStart = false
    }
    setBoot() {
        this._isBoot = true
    }
    isBoot() {
        return this._isBoot
    }

    setNotBoot() {
        this._isBoot = false
    }




}

/**
 * @typedef {States<ControllState>} StatesType
 */
module.exports = { States }