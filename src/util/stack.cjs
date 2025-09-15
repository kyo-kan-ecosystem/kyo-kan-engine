
const deepmerge = require("deepmerge")


/**
 * @template StackItem
 */
class Stack {
    /**
     * 
     * @param {StackItem[]} items 
     * 
     */
    constructor(items) {
        /**
         * @type {StackItem[]}
         */
        this._items = (items || []).copyWithin()


    }
    isEmpty() {
        return this._items.length == 0
    }
    /**
     * 
     * @returns {false | any}
     */
    get(position = 0) {
        const _position = this._items.length - 1 - position
        if (_position < 0) {
            return false
        }
        return this._items[_position]
    }
    pop() {
        if (this._items.length == 0) {
            return false
        }
        this._items.pop()
        return this.get()
    }
    push(item) {
        this._items.push(item)

    }
    /**
     * 
     * @param {Partial<StackItem>} upData 
     * @param {true?} isFullOverWrite 
     */
    update(upData, isFullOverWrite) {
        if (isFullOverWrite === true) {
            this._items[this._items.length - 1] = upData
        }
        else {
            const item = this._items[this._items.length - 1]
            this._items[this._items.length - 1] = deepmerge(item, upData)
        }

    }
    getSerializedData() {
        return this._items

    }




}


/**
 * @template {Stack} StackClass
 * 
 */
class StackTree {
    /**
     * 
     * @param {Object | null} initData 
     * @param {StackClass} stackClass 
     */
    constructor(initData = null, stackClass = Stack) {

        /**
         * @type {typeof StackClass}
         */
        this._stackClass = stackClass;
        /**
         * @type {{[x in any]: StackClass}}
         */
        this._branches = {}
        this._initBranches(initData);
        this._count = 1
        this._id = 1

    }
    isEnd() {
        return this._branches[this._id].isEmpty()
    }
    isTop(id) {
        return this.topId == id || this._id
    }
    switchId(id) {
        /**
         * @type {typeof this}
         */
        const responseObj = new this.constructor(false, this._stackClass)
        responseObj.setBranchs(this._branches)
        responseObj._count = this._count
        responseObj._setId(id)
        return responseObj;

    }
    splitTree(splitCount) {
        let count = 0

        const results = []
        const linkPath = this._id
        const init = { linkPath }
        while (count < splitCount) {
            const id = this._count
            this._count += 1
            count += 1
            this._branches[id] = new this._stackClass(init)
            results.push(this.switchId(id))

        }

        return results


    }
    getNode() {
        return this._branches[this._id]
    }
    _setId(id) {
        const _id = id || 0;
        this._id = _id;

    }
    /**
     * 
     * @param {*} state
     * @param {true?} isFullOverWrite  
     */
    update(state, isFullOverWrite) {

        this._branches[this._id].update(state, isFullOverWrite)

    }
    get(position) {
        return this._branches[this._id].get(position)
    }
    getBranchLength() {
        return this._branches[this._id].length;

    }


    /**
     * 
     * @param {any} initData 
     */
    _initBranches(initData) {

        this.topId = 0;
        if (init === false) {
            return

        }
        if (!init) {
            this._branches[this.topId] = new this._stackClass({ id: this.topId })

        }
        else {
            this.setSerializedData(initData)


        }



    }
    /**
     * 
     * @param {any[]} datas 
     */
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas || [])) {
            this._branches[key] = new this._stackClass(value);

        }
        this._count = datas.length
    }
    getSerializedData() {
        const branches = {};
        for (const [key, value] of Object.entries(this._branches)) {
            branches[key] = value.getSerializedData();

        }
        return { branches: branches, count: this._count }
    }
    setBranchs(branches) {
        this._branches = branches


    }
    removeBranch(id) {
        delete this._branches[id]
    }
    push(data) {
        this._branches[this.id].push(data)
    }
    pop() {
        return this._branches[this.id].pop()
    }






}


module.exports = { Stack, StackTree }