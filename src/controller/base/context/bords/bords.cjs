const { StackTree } = require("../../../../util/stack.cjs");
/**
 * @typedef {{workflow:any, subWorkflow:any}} ContextBordFocus
 * @typedef {{global?:any,items?:ContextBordFocus[]}} BordInit
 */
class Bords extends StackTree {
    /**
     * @param {BordInit?} bordInit 
     */
    constructor(bordInit) {
        /**
         * @type {bordInit}
         */
        const _bordInit = bordInit || {}
        super(bordInit.items)

        this._global = Object.assign({}, _bordInit.global || {})
        this._subWorkflow = Object.assign({}, _bordInit.global || {})

    }

    global() {
        return this._global
    }
    updateGlobal(data) {
        this._global = data

    }
    subWorkflow() {
        return this._subWorkflow
    }
    pushBranch(data) {
        this._subWorkflow = {}
        super.pushBranch()
    }
    popBranch() {
        this._subWorkflow = super.popBranch()
        return this._subWorkflow
    }



}

module.exports = { Bords }