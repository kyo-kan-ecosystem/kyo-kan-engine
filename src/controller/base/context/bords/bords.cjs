const { StackTree } = require("../../../../util/stack.cjs")
const { BordsBranch } = require("./bords_branch.cjs")






class Bords extends StackTree {

    /**
     * @type {any}
     */
    _global

    constructor(initData = null, branchClass = BordsBranch) {
        super(initData, branchClass)
        this._global = {}
    }



    /**
     * 
     * @param {*} workflow
     */
    push(workflow) {
        const item = { workflow }
        return super.push(item)


    }



    getCurrentWorkflow() {
        /**
         * @type {{workflow:any}}
         */
        const item = this.get()
        return item.workflow


    }
    /**
     * 
     * @param {*} data
     * @param {true?} [isFullOverWrite=null]  
     */
    updateCurrentWorkflowBord(data, isFullOverWrite = null) {
        /**
         * @type {{current:any}}
         */
        const item = this.get() || {}
        item.current = data
        this.update(item, isFullOverWrite)


    }

    getSubworkflowBord() {
        /**
         * @type {{subworkflow?:any}}
         */
        const item = this.get()
        return item.subworkflow
    }
    pop() {
        /**
         * @type {{workflow:any}}
         */
        const item = super.pop()
        /**
         * @type {{subworkflow?:any}}
         */
        const nowItem = this.get()
        nowItem.subworkflow = item
        this.update(nowItem, true)
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
     * @param {*} subworkflow 
     */
    setSubWorkFlow(subworkflow) {
        this.update({ subworkflow })
    }

    getSubWorkflow() {
        return this.get()?.subworkflow;
    }






}

module.exports = { Bords }