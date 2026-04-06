const deepmerge = require("deepmerge")
const { StackTree } = require("../../util/stack/stack.cjs")
const { BordsBranch } = require("./bords_branch.cjs")






/**
 * @typedef {{[k in string]:any}} LinkMapType
 */
/**
 * TODO プラグインローカル実装 
 */
/**
 * @extends StackTree<BordsBranch>
 */
class Bords extends StackTree {

    /**
     * @type {any}
     */
    _global

    /**
     * @type {LinkMapType}
     */
    _nameMap




    /**
     * 
     * @param {{_nameMap?:LinkMapType, _global?:any} & import("../../util/stack/protocol").SeriaraizableStackTreeData | false | null} initData 
     * @param {*} branchClass 
     * @returns 
     */
    constructor(initData = null, id = null, branchClass = BordsBranch) {

        // @ts-ignore
        super(initData, id, branchClass)
        if (initData === false) {
            return
        }

        this._global = initData?._global || {}
        this._nameMap = initData?._nameMap || {}


    }



    /**
     * 
     * @param {*} workflow
     */
    push(workflow = null) {
        const item = { workflow: workflow || {} }
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
        const nowId = this.getBranchId()
        const name = this._nameMap[nowId]
        /**
         * @type {{workflow:any}}
         */
        const item = super.pop()


        /**
        * @type {{subworkflow?:any}}
        */
        const nowItem = this.get()
        if (typeof name === "undefined") {
            nowItem.subworkflow = item.workflow
        }
        else {
            const subworkflow = nowItem.subworkflow || {}


            subworkflow[name] = item.workflow
            nowItem.subworkflow = subworkflow
        }
        this.update(nowItem)



        return item




    }
    forkAsNamedTree(name) {

        const tree = this.fork()


        const branchId = tree.getBranchId()
        this._nameMap[branchId] = name

        return tree

    }


    /**
     * @param {{nameMap:LinkMapType, global:any} & import("../../util/stack/protocol").SeriaraizableStackTreeData} params
     */

    // @ts-ignore
    setReference(params) {

        // @ts-ignore
        super.setReference(params)
        this._nameMap = params.nameMap
        this._global = params.global
    }
    getReference() {
        const ret = super.getReference()
        ret.nameMap = this._nameMap
        ret.global = this._global
        return ret
    }




    getGlobal() {
        return this._global
    }
    /**
     * @param {any} data
     * @param {true?} [isFullOverWrite=null] 
     */
    updateGlobal(data, isFullOverWrite = null) {
        if (isFullOverWrite === true) {
            this._global = data

        }
        else {
            deepmerge(this._global, data)
        }






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