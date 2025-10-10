const { BordsTree } = require("./bords_tree.cjs")

const { BordsBranch } = require("./bords_branch.cjs");

/**
 * @typedef {{tree:typeof BordsTree, branch:typeof BordsBranch}} TreeClasses
 */
/**
 * @type {TreeClasses}
 */
const DEFUALT_CLASSES = {
    tree: BordsTree,
    branch: BordsBranch
}

class Bords {
    /**
     * @type {BordsTree}
     */
    _tree
    /**
     * @type {TreeClasses}
     */
    _treeClasses




    /**
     * @type {any}
     */
    _global

    /**
     * @type {{state:import("../states/states.cjs").States}}
     */
    _mutableTree
    /**
     * @param {any} initData
     * @param {{state:import("../states/states.cjs").States}} mutableTree
     * @param {TreeClasses?} treeClasses 
     
     * 
     */
    constructor(initData, mutableTree, treeClasses = null) {
        this._treeClasses = treeClasses || DEFUALT_CLASSES

        this._mutableTree = mutableTree
        if (initData instanceof this._treeClasses.tree) {
            this._tree = initData

        }
        else {
            this._tree = new this._treeClasses.tree(initData, this._treeClasses.branch)

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
    goSub() {
        /**
         * @type {import("../../../protocol").StateType}
        */
        const superState = this._mutableTree.state.get(1) || {}
        const workflow = superState.subBordInit || {}
        this.push(workflow)

    }



    getCurrentWorkflow() {
        /**
         * @type {{workflow:any}}
         */
        const item = this._tree.get()
        return item.workflow


    }
    /**
     * 
     * @param {*} data
     * @param {true?} [isFullOverWrite=null]  
     */
    updateCurrentWorkflow(data, isFullOverWrite = null) {
        /**
         * @type {{current:any}}
         */
        const item = this._tree.get() || {}
        item.current = data
        this._tree.update(item, isFullOverWrite)


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
     * @param {*} [isFullOverWrite]  
     */

    update(data, isFullOverWrite) {

        this._tree.update(data, isFullOverWrite)


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
     * @param {{state:any}} mutableTreeIds
     * @param {number?} [id] 
     */
    fork(mutableTreeIds, id) {
        const forkTree = this._tree.fork(id)
        const mutableTree = { state: this._mutableTree.state.fork(mutableTreeIds.state) }


        /**
         * @type {typeof this}
         */
        // @ts-ignore
        const forked = new this.constructor(forkTree, mutableTree, this._treeClass, this._branchClass)
        forked.updateGlobal(this.getGlobal())
        forked.setSubWorkFlow(this.getSubWorkflow())
        return forked



    }





}

module.exports = { Bords }