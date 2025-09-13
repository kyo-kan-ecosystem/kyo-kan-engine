const { Stack } = require("../../../../util/stack.cjs");


/**
 * @typedef {{elemnts:any, linkToState:any, linkedCount:any, id:any}} StateInit
 */


class StateBranch extends Stack {
    /**
     * 
     * @param {StateInit} args 
     */
    constructor(args) {
        super(args.elemnts)
        this._setLinkPath(args)



    }

    /**
    *@param {StateInit} args 
    */
    _setId(args) {
        this.id = args.id

    }
    /**
     *@param {StateInit} args 
     */
    _setLinkPath(args) {
        this.linkPath = args.linkPath || null

    }
    /**
     *@param {StateInit} args 
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
    getSerializedData() {
        return { id: this.id, linkedCount: this.linkedCount, elemnts: this._elements, linkPath: this.linkPath }
    }
}

module.exports = { StateBranch }