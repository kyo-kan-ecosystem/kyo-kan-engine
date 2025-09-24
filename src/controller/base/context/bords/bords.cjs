const { StackTree } = require("../../../../util/stack.cjs");
const { BordsBranch } = require("./bords_branch.cjs");



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
     * @type {typeof BordsBranch}
     */
    _branchClass

    /**
     * @type {any}
     */
    _global

    /**
     * @param {any} initData
     * @param {typeof StackTree} [treeClass=StackTree]
     * @param {typeof BordsBranch} [branchClass=BordsBranch] 
     * 
     */
    constructor(initData, treeClass = StackTree, branchClass = BordsBranch) {
        this._treeClass = treeClass
        this._branchClass = branchClass
        if (initData instanceof treeClass) {
            this._tree = initData

        }
        else {
            this._tree = new this._treeClass(initData, branchClass)

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




    getGlobal() {
        return this._global
    }
    /**
     * @param {any} data 
     */
    updateGlobal(data) {
        this._global = data




    }

    /**
     * 
     * @param {*} data 
     */

    update(data) {

        this._tree.update


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
    /**
     * 
     * @param {number?} [id] 
     */
    fork(id) {
        const forkTree = this._tree.fork(id)

        /**
         * @type {typeof this}
         */
        // @ts-ignore
        const forked = new this.constructor(forkTree)
        forked.updateGlobal(this.getGlobal())
        forked.setSubWorkFlow(this.getSubWorkflow())
        return forked



    }





}

module.exports = { Bords }