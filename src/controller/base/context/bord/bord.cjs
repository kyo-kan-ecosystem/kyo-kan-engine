import { StackTree } from "../../../../util/stack.cjs";
/**
 * @typedef {{workflow:any, subWorkflow:any}} ContextBordFocus
 * @typedef {{global?:any,elements?:ContextBordFocus[]}} BordInit
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
        super(bordInit.elements)
        this._global = _bordInit.global
    }
}

module.exports = { Bords }