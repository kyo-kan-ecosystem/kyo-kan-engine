
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
    _isStart

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
        const isInitDataVoid = initData === null || typeof initData === 'undefined'
        const isIdVoid = id == null || typeof id === 'undefined'

        this._isStart = isInitDataVoid && isIdVoid

        this._isBoot = false




    }




    isStart() {
        return this._isStart

    }
    setNotStart() {
        this._isStart = false
    }
    setBoot() {
        this.now.update({ isBoot: true })
    }
    setIsBoot() {
        this.now.update({ isBoot: true })
    }
    isBoot() {
        return this.now.get()?.isBoot === true
    }
    setNotBoot() {
        this.now.update({ isBoot: false })
    }


}

/**
 * @typedef {States<ControllState>} StatesType
 */
module.exports = { States }