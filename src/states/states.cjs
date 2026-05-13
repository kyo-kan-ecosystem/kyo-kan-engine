
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
    goSub() {
        const subworkflowId = this.controll.getSubworkflowId()
        this.now.push({ workflow: { id: subworkflowId } })


    }

    returnFromSub() {
        return this.pop()
    }
    isStart() {
        return this.now.get()?.isStart === true

    }
    setNotStart() {
        this.now.update({ isStart: false })
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