const { StackTree } = require("../../../../util/stack.cjs");
/**
 * @typedef {any} ContextBordFocus
 * @typedef {{global?:any,items?:Object<any, ContextBordFocus[]>}} BordInit
 */
class Bords extends StackTree {
    /**
     * @private
     * @type {boolean}
     */
    _isBordUpdate

    /**
     * @private
     * @type {boolean}
     */
    _isGlobalUpdate

    /**
     * @param {BordInit?} bordInit 
     */
    constructor(bordInit) {
        /**
         * @type {bordInit}
         */
        const _bordInit = bordInit || {}
        super(_bordInit.items);
        this._isBordUpdate = false;
        this._isGlobalUpdate = false;

        this._global = Object.assign({}, _bordInit.global || {})
        this._subWorkflow = Object.assign({}, _bordInit.subWorkflow || {})

    }

    global() {
        return this._global
    }
    updateGlobal(data) {
        this._global = data
        this._isGlobalUpdate = true;



    }
    checkIsUpdate() {
        return { 'global': this._isGlobalUpdate, 'bord': this._isBordUpdate }
    }
    update(data) {
        super.update(data)
        this._isBordUpdate = true;

    }
    setSubWorkFlow(data) {
        this._subWorkflow = data;
    }

    getSubWorkflow() {
        return this._subWorkflow;
    }
    push(data) {
        this._subWorkflow = {}
        super.push(data)
    }
    pop() {
        this._subWorkflow = super.pop()
        return this._subWorkflow
    }
    /**
     * @returns {BordInit}
     */
    getSerializedData() {
        const items = super.getSerializedData()
        return { 'global': this._global, items }

    }



}

module.exports = { Bords }