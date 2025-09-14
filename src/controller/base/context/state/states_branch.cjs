const { Stack } = require("../../../../util/stack.cjs");


/**
 * @typedef {{items:any, linkBranch:any, linkedCount:any, id:any}} StateData
 */


class StateBranch extends Stack {
    /**
     * 
     * @param {StateData} stateInit 
     */
    constructor(stateInit = {}) {
        super(stateInit.items)
        this._setLinkBranch(stateInit)



    }

    /**
    *@param {StateData} args 
    */
    _setId(args) {
        this.id = args.id

    }
    /**
     *@param {StateData} args 
     */
    _setLinkBranch(args) {
        this.linkBranch = args.linkPath || null

    }
    /**
     *@param {StateData} args 
    */
    _setLinkedCount(args) {

        this.linkedCount = args.linkedCount || 0

    }
    addLinkedCount(plusNumber = 1) {
        this.linkedCount += plusNumber
    }

    subtractLinkedCount(minusNumber = 1) {
        this.linkedCount -= minusNumber
    }
    /**
     * 
     * @returns {StateData}
     */
    getSerializedData() {
        return { id: this.id, linkedCount: this.linkedCount, items: this._items, linkBranch: this.linkBranch }
    }
}

module.exports = { StateBranch }