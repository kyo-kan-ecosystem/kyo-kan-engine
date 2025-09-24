
const deepmerge = require("deepmerge")


/**
 * A stack data structure that follows the LIFO (Last-In, First-Out) principle.
 * Intended for use in state history management and similar applications.
 * 
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
     * @returns {any | null} The element at the specified position, or null if it does not exist.
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
     * @param {Partial<any>} upData - The data to update the top item with.
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
    getSerializedData() {
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
 * A Facade for managing a stack structure with multiple branches.
 * Each branch is managed as an independent `Stack` instance.
 * @typedef {{ branches: {[k in any]: any}, count: number, linkedCounts:{[k in number]:number}, linkMap:{[k in number]:number} }} SeriaraizedStackTree
 * 
 * 
 *
 */
/**
 * @template {Stack} StackClass
 */
class StackTree {
    /**
     * @type {{n:number}}
     */
    _countRef

    /**
     * @type {{[x in any]: StackClass}}
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
     * Creates an instance of StackTree.
     * @param {SeriaraizedStackTree | null | false} [initData=null] - Initial data to restore the tree state.
     * @param {typeof Stack} [branchClass=Stack] - The stack class to be used internally.
     */
    constructor(initData = null, branchClass = Stack) {

        this._countRef = { n: 0 };
        this._branchClass = branchClass;
        this._branches = {}
        this._linkMap = {}
        this._linkedCounts = {}

        this.topId = 0;
        this._branchId = this.topId

        if (initData === false) {
            return

        }
        if (!initData) {
            this._branches[this.topId] = new this._branchClass();
            this._countRef.n = 1;
            return

        }

        this.setSerializedData(initData);
    }

    /**
     * Determines if the current branch is empty.
     * @returns {boolean}
     */
    isEnd() {
        return this._branches[this._branchId].isEmpty()
    }

    /**
     * Checks if the given ID matches the top-level branch ID.
     * @param {number} id 
     * @returns {boolean}
     */
    isTop(id) {
        return this.topId === id;
    }

    /**
     * Forks a new branch from the current branch.
     * @param {number?} [id] 
     * @returns {StackTree}
     */
    fork(id) {
        /**
         * @type {typeof this}
         */
        // @ts-ignore
        const responseObj = new this.constructor(false, this._branchClass)
        responseObj.setReference(this._branches, this._countRef, this._linkMap, this._linkedCounts)
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
        responseObj.setBranchId(_id)
        return responseObj;

    }

    /**
     * Returns the `Stack` instance of the currently active branch.
     * @returns {StackClass}
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
     * Gets the parent branch ID for a given branch ID.
     * @param {number} id The ID of the child branch.
     * @returns {number | undefined} The ID of the parent branch, or undefined if it's a top-level branch or doesn't exist.
     */
    getParentBranchId(id) {
        return this._linkMap[id];
    }

    /**
     * Gets the number of branches forked from a given branch ID.
     * @param {number} id - The ID of the parent branch.
     * @returns {number} The number of direct child branches.
     */
    getLinkedCount(id) {
        return this._linkedCounts[id] || 0;
    }

    setBranchId(id) {

        this._branchId = id;
        if (!this._branches[id]) {
            // Create an empty stack for the new branch
            this._branches[id] = new this._branchClass();
        }


    }

    /**
     * Updates the top element of the current branch.
     * @param {*} stackData
     * @param {true?} isFullOverWrite  
     */
    update(stackData, isFullOverWrite = null) {

        this._branches[this._branchId].update(stackData, isFullOverWrite)
    }

    /**
     * Gets an element from the current branch.
     * @param {number} digg - The offset from the top of the stack.
     * @returns {any | null}
     */
    get(digg = 0) {
        return this._branches[this._branchId].get(digg)
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
     * @param {SeriaraizedStackTree} datas - The serialized data.
     */
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas.branches || [])) {
            this._branches[key] = new this._branchClass(value);

        }
        this._countRef.n = datas.count
        this._linkMap = Object.assign({}, datas.linkMap || {})
        this._linkedCounts = Object.assign({}, datas.linkedCounts || {})
    }

    /**
     * Returns the current state of the `StackTree` as a serializable object.
     * @returns {SeriaraizedStackTree}
     */
    getSerializedData() {
        const branches = {};
        for (const [key, value] of Object.entries(this._branches)) {
            branches[key] = value.getSerializedData();

        }
        return { branches: branches, count: this._countRef.n, linkedCounts: Object.assign({}, this._linkedCounts), linkMap: Object.assign({}, this._linkMap) }
    }

    /**
     * Shares branch data and a counter with another `StackTree` instance.
     * Primarily used internally by the `fork` method.
     * @param {{[x in any]: StackClass}} branches
     * @param {{n: number}} countRef
     * @param {{[k in any]:number}} linkMap 
     * @param {{[k in any]:number}} linkedCounts 
     */
    setReference(branches, countRef, linkMap, linkedCounts) {
        this._branches = branches
        this._countRef = countRef
        this._linkMap = linkMap
        this._linkedCounts = linkedCounts
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
     * Pushes data onto the current branch.
     * @param {*} data
     */
    push(data) {
        this._branches[this._branchId].push(data)
    }

    /**
     * Pops data from the current branch.
     * @returns {any}
     */
    pop() {
        return this._branches[this._branchId].pop()
    }
}


module.exports = { Stack, StackTree }