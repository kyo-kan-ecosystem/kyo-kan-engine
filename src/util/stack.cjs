class Stack {
    /**
     * 
     * @param {any} elements 
     * 
     */
    constructor(elements) {
        /**
         * @type {Array}
         */
        this._elements = (elements || []).copyWithin()


    }
    isEmpty() {
        return this._elements.length == 0
    }
    /**
     * 
     * @returns {false | any}
     */
    get() {
        if (this._elements.length == 0) {
            return false
        }
        return this._elements[this._elements.length - 1]
    }
    pop() {
        if (this._elements.length == 0) {
            return false
        }
        this._elements.pop()
        return this.get()
    }
    push(element) {
        this._elements.push(element)

    }
    update(element) {
        this._elements[this._elements.length - 1] = element
    }




}

/**
 * @template StateClass
 * 
 */
class StackTree {
    /**
     *
     * @param {Object | null} initData 
     * @param {any} stateClass 
     */
    constructor(initData = null, stateClass = StateNode) {


        this._stackClass = stateClass;
        /**
         * @type {{[x in any]: StateClass}}
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
     */
    update(state) {

        this._branches[this._id].update(state)

    }
    get() {
        return this._branches[this._id].get()
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
        if (init === null) {
            this._branches[this.topId] = new this._stackClass({ id: this.topId })

        }
        else {
            this.setSerializedData(initData)


        }



    }
    /**
     * 
     * @param {{paths?:any[]}} datas 
     */
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas.paths || [])) {
            this._branches[key] = new this._stackClass(value);

        }
        this._count = datas.count
    }
    getSerializedData() {
        const paths = {};
        for (const [key, value] of Object.entries(this._branches)) {
            paths[key] = value.getSerializedData();

        }
        return { paths, count: this._count }
    }
    setBranchs(branches) {
        this._branches = branches


    }
    removeBranch(id) {
        delete this._branches[id]
    }





}


module.exports = { Stack, StackTree }