const { StackTree } = require("../../../../util/stack.cjs");
/**
 * @typedef {any} ContextBordFocus
 * 
 */
class Bords {
    /**
     * @type {StackTree}
     */
    _tree

    /**
     * @type {typeof StackTree}
     */
    _treeClass



    /**
     * @param {any} initData
     * @param {typeof StackTree} treeClass
     */
    constructor(initData, treeClass = StackTree) {
        this._treeClass = treeClass
        if (initData instanceof treeClass) {
            this._tree = initData

        }
        else {
            this._tree = new this._treeClass(initData)

        }



    }
    /**
     * 
     * @param {*} id 
     */
    setBranchId(id) {
        return this._tree.setBranchId(id)
    }
    getBranchId() {
        return this._tree.getBranchId()
    }
    /**
     * 
     * @param {*} workflow
     */
    push(workflow) {
        const item = { workflow }
        return this._tree.push(item)


    }
    getWorkflowBord() {
        /**
         * @type {{workflow:any}}
         */
        const item = this._tree.get()
        return item.workflow


    }
    getBranchDepth() {
        return this._tree.getBranchDepth()
    }
    getSubworkflowBord() {
        /**
         * @type {{subworkflow?:any}}
         */
        const item = this._tree.get()
        return item.subworkflow
    }
    pop() {
        /**
         * @type {{workflow:any}}
         */
        const item = this._tree.pop()
        /**
         * @type {{subworkflow?:any}}
         */
        const nowItem = this._tree.get()
        nowItem.subworkflow = item
        this._tree.update(nowItem)
        return item




    }




    global() {
        return this._global
    }
    /**
     * @param {any} data 
     */
    updateGlobal(data) {
        this._global = data
        this._isGlobalUpdate = true;



    }
    checkIsUpdate() {
        return { 'global': this._isGlobalUpdate, 'bord': this._isBordUpdate }
    }
    /**
     * 
     * @param {*} data 
     */

    update(data) {
        const baseData = super.get()
        super.update(data)
        this._isBordUpdate = true;

    }
    /**
     * 
     * @param {*} data 
     */
    setSubWorkFlow(data) {
        this._subworkflow = data;
    }

    getSubWorkflow() {
        return this._subworkflow;
    }





}

module.exports = { Bords }