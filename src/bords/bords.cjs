const deepmerge = require("deepmerge")
const { StackTree } = require("../util/stack/stack.cjs")
const { BordsBranch } = require("./bords_branch.cjs")






/**
 * @typedef {{[k in string]:any}} LinkMapType
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
    // @ts-ignore
    _nameMap




    /**
     * 
     * @param {{_nameMap?:LinkMapType, _global?:any} & import("../util/stack/protocol").SeriaraizableStackTreeData | false | null} initData 
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
        return this.now.push(item)


    }



    getCurrentWorkflow() {

        const item = this.now.get()
        return item.workflow


    }
    /**
     * 
     * @param {*} data
     * @param {true?} [isFullOverWrite=null]  
     */
    updateCurrentExecutorBord(data, isFullOverWrite = null) {

        const item = this.now.get() || {}
        item.current = data

        this.now.update(item, isFullOverWrite)


    }

    getSubworkflowBord() {

        const item = this.now.get()
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
        const nowItem = this.now.get()
        if (typeof name === "undefined") {
            nowItem.subworkflow = item.workflow
        }
        else {
            const subworkflow = nowItem.subworkflow || {}


            subworkflow[name] = item.workflow
            nowItem.subworkflow = subworkflow
        }
        this.now.update(nowItem)



        return item




    }
    /**
     * @param {string} name
     */
    forkAsNamedTree(name) {

        const tree = this.fork()


        const branchId = tree.getBranchId()
        this._nameMap[branchId] = name

        return tree

    }


    /**
     * @param {{nameMap:LinkMapType, global:any} & import("../util/stack/protocol").SeriaraizableStackTreeData} params
     */

    // @ts-ignore
    setReference(params) {

        // @ts-ignore
        super.setReference(params)
        this._nameMap = params.nameMap
        this._global = params.global
    }
    /**
     * 
     * @returns {import("./bords.protocol").BordsReferenceDataProtocol}
     */
    getReference() {
        /**
         * @type {import("./bords.protocol").BordRefernceData}
         */
        const bordData = {
            nameMap: this._nameMap,
            global: this._global
        }
        const ret = super.getReference()

        return Object.assign(ret, bordData)

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
        this.now.update({ subworkflow })
    }

    getSubWorkflow() {
        return this.now.get()?.subworkflow;
    }






}

module.exports = { Bords }