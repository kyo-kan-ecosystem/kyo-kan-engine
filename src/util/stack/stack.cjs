
const deepmerge = require("deepmerge")
const { StackTreeRootPopError, StackTreeRootSuperGetError, StackTreeBranchDoesNotExistError } = require("./errors.cjs")


/**
 * A stack data structure that follows the LIFO (Last-In, First-Out) principle.
 * Intended for use in state history management and similar applications.
 * 
 * @template DataType
 */
class Stack {
    /**
     * @param {any[]?} [items] - Initial items to populate the stack with.
     */
    constructor(items) {
        /**
         * @type {any[]}
         */
        this._items = this._cloneItems(items || [])
    }
    /**
     * Returns the number of elements in the stack.
     * @type {number}
     */
    get length() {
        return this._items.length
    }

    /**
     * Determines if the stack is empty.
     * @returns {boolean} `true` if the stack is empty, otherwise `false`.
     */
    isEmpty() {
        return this._items.length == 0
    }

    /**
     * Retrieves an element from the stack at a specified position from the top.
     * @param {number} [digg=0] - The offset from the top of the stack (0 is the top).
     * @returns {DataType} The element at the specified position, or null if it does not exist.
     */
    get(digg = 0) {
        if (this.isEmpty() === true) {
            throw new Error("Stack is empty")
        }
        const _position = this._items.length - 1 - digg
        if (_position < 0) {
            throw new Error(`Stack depth is ${this._items.length - 1}, but digg is ${digg}`)
        }
        return this._items[_position]
    }

    /**
     * Removes the top element from the stack and returns it.
     * @returns {any} The removed element.
     * @throws {Error} Thrown if the stack is empty.
     */
    pop() {
        if (this.isEmpty() === true) {
            throw new Error("Stack is empty")
        }

        return this._items.pop();
    }

    /**
     * Adds a new element to the top of the stack.
     * @param {any} item - The element to add.
     */
    push(item) {
        this._items.push(item)

    }
    /**
     * Updates the top element of the stack.
     * @param {Partial<DataType>} upData - The data to update the top item with.
     * @param {true?} [isFullOverWrite] - If true, the item is completely replaced; otherwise, it's merged.
     */
    update(upData, isFullOverWrite) {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");


        }
        if (isFullOverWrite === true) {

            this._items[this._items.length - 1] = upData
        }
        else {
            const item = this._items[this._items.length - 1]
            this._items[this._items.length - 1] = deepmerge(item, upData)

        }

    }

    /**
     * Returns a deep-copied array of all elements in the stack.
     * @returns {any[]} A deep-copied array of elements.
     */
    getSerializableData() {
        return this._cloneItems(this._items);
    }

    /**
     * @private
     * @param {any[]} items
     * @returns {any[]}
     */
    _cloneItems(items) {
        return items.map(function (value) {
            if (typeof value === "object") {
                if (value === null || value instanceof Date) {
                    return value
                }
                return deepmerge({}, value)
            }
            return value

        })

    }

}



/**

 * @template {Stack<any>} BranchClass
 * 
 *
 */
class StackTree {
    /**
     * @type {{n:number}}
     */
    _countRef

    /**
     * @type {{[x in any]: BranchClass}}
     * 
     */
    _branches

    /**
     * @type {any}
     */
    _branchClass

    /**
     * @type {number}
     */
    _branchId

    /**
     * @type {number}
     */
    topId

    /**
     * @type {{[k in number]:number}}
     */
    _linkedCounts
    /**
     * @type {{[k in number]:number}}
    */
    _linkMap
    /**
     * @type {BranchClass}
     */
    // @ts-ignore
    now

    /**
     * Creates an instance of StackTree.
     * @param {import("./protocol").SeriaraizableStackTreeData | import("./protocol").StackReference<BranchClass>| null} [initData=null] - Initial data to restore the tree state.
     * @param {number?} id 
     * @param {any} [branchClass=Stack] - The stack class to be used internally.
     */
    constructor(initData = null, id = null, branchClass = Stack) {

        this._countRef = { n: 0 };
        this._branchClass = branchClass;
        this._branches = {}
        this._linkMap = {}
        this._linkedCounts = {}

        this.topId = 0;
        this._branchId = this.topId

        if (id != null) {
            // @ts-ignore
            this.setReference(initData)
            this.setBranchId(id)
            return


        }
        if (initData === null) {


            this._countRef.n = 1;
            this.setBranchId(this.topId, false)
            return

        }

        // @ts-ignore
        this.setSerializableData(initData);
    }

    /**
     * Determines if the current branch is empty.
     * @returns {boolean}
     */
    isEmptyNow() {
        return this._branches[this._branchId].isEmpty()
    }

    /**
     * Checks if the given ID matches the top-level branch ID.
     * @param {number?} id 
     * @returns {boolean}
     */
    isRoot(id = null) {
        const _id = id == null ? this.getBranchId() : id
        return this.topId === _id;
    }

    /**
     * Forks a new branch from the current branch.
     * @param {number?} [id] 
     * @returns {this}
     */
    fork(id) {

        /**
         * @type {number}
         */
        let _id;

        if (typeof id === "number") {
            _id = id
        }
        else {
            _id = this._countRef.n
            this._countRef.n++
            this._linkMap[_id] = this._branchId
            this._linkedCounts[this._branchId] = (this._linkedCounts[this._branchId] || 0) + 1
        }

        // @ts-ignore
        const responseObj = new this.constructor(this.getReference(), this._branchClass)

        responseObj.setBranchId(_id)
        return responseObj;

    }

    /**
     * Returns the `Stack` instance of the currently active branch.
     * @returns {BranchClass}
     */
    getStack() {
        return this._branches[this._branchId]
    }

    /**
     * Returns the ID of the currently active branch.
     * @returns {number}
     */
    getBranchId() {
        return this._branchId
    }

    /**
     * Gets the super branch ID for a given branch ID.
     * @param {number?} id The ID of the child branch.
     * @returns {number} The ID of the super branch, or undefined if it's a top-level branch or doesn't exist.
     */
    getSuperBranchId(id = null) {
        const _id = id == null ? this._branchId : id
        if (_id in this._linkMap) {
            return this._linkMap[_id]
        }
        throw new StackTreeRootSuperGetError(id)

    }

    /**
     * Gets the number of branches forked from a given branch ID.
     * @param {number} id - The ID of the super branch.
     * @returns {number} The number of direct child branches.
     */
    getLinkedCount(id) {
        return this._linkedCounts[id] || 0;
    }

    /**
     * @param {number} id
     * @param {boolean} [isStrict=true] 
     */
    setBranchId(id, isStrict = true) {

        this._branchId = id;
        if (!this._branches[id]) {
            if (isStrict === true) {
                throw new StackTreeBranchDoesNotExistError(id)

            }

            this._branches[id] = new this._branchClass();
        }
        this.now = this._branches[id]


    }






    /**
     * Returns the depth (number of elements) of the current branch.
     * @returns {number}
     */
    getBranchDepth() {
        return this._branches[this._branchId].length;

    }


    /**
     * Restores the state of the `StackTree` from serialized data.
     * @param {import("./protocol").SeriaraizableStackTreeData} datas - The serialized data.
     */
    setSerializableData(datas) {
        for (const [key, value] of Object.entries(datas.branches || [])) {
            this._branches[key] = new this._branchClass(value);

        }
        this._countRef.n = datas.count
        this._linkMap = Object.assign({}, datas.linkMap || {})
        this._linkedCounts = Object.assign({}, datas.linkedCounts || {})
    }

    /**
     * Returns the current state of the `StackTree` as a serializable object.
     * @returns {import("./protocol").SeriaraizableStackTreeData}
     */
    getSerializableData() {
        const branches = {};
        for (const [key, value] of Object.entries(this._branches)) {
            // @ts-ignore
            branches[key] = value.getSerializableData();

        }
        return { branches: branches, count: this._countRef.n, linkedCounts: Object.assign({}, this._linkedCounts), linkMap: Object.assign({}, this._linkMap) }
    }

    /**
     * Shares branch data and a counter with another `StackTree` instance.
     * Primarily used internally by the `fork` method.
     * @param {Object} param0 
     * @param {*} param0.branches 
     * @param {*} param0.countRef 
     * @param {*} param0.linkMap 
     * @param {*} param0.linkedCounts 
    
     */
    setReference({ branches, countRef, linkMap, linkedCounts }) {
        this._branches = branches
        this._countRef = countRef
        this._linkMap = linkMap
        this._linkedCounts = linkedCounts
    }
    /**
     * 
     * @returns {import("./protocol").StackTreeReferenceData}
     */
    getReference() {
        return { branches: this._branches, countRef: this._countRef, linkMap: this._linkMap, linkedCounts: this._linkedCounts }

    }

    /**
     * Removes the branch with the specified ID.
     * @param {number} id
     */
    removeBranch(id) {
        delete this._branches[id]
        if (this._linkMap[id] in this._linkedCounts) {
            this._linkedCounts[this._linkMap[id]]--
        }

        delete this._linkMap[id]

    }



    /**
     * Pops data from the current branch.
     * @param {Object} [param0={}] 
     * @param {boolean} [param0.checkIsTop=true] 
     * @param {boolean} [param0.autoreturn=true] 
     * @returns {any}
     */
    pop(checkIsTop = true) {
        const ret = this._branches[this._branchId].pop()

        if (this.isEmptyNow() === true) {
            if (this.isRoot() === true) {
                if (checkIsTop === true) {
                    throw new StackTreeRootPopError()

                }
                return ret
            }



            this.setBranchId(this.getSuperBranchId())




        }
        return ret

    }


}


module.exports = { Stack, StackTree }