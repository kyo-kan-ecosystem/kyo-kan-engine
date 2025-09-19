/**
 * A Facade for managing a stack structure with multiple branches.
 * Each branch is managed as an independent `Stack` instance.
 */
export type SeriaraizedStackTree<StackClass extends Stack<any>> = {
    branches: { [k in any]: any; };
    count: number;
    linkedCounts: { [k in number]: number; };
    linkMap: { [k in number]: number; };
};
/**
 * A stack data structure that follows the LIFO (Last-In, First-Out) principle.
 * Intended for use in state history management and similar applications.
 * @template {Object} StackItem
 */
export class Stack<StackItem extends unknown> {
    /**
     * @param {StackItem[]?} [items] - Initial items to populate the stack with.
     */
    constructor(items?: StackItem[] | null);
    /**
     * @type {StackItem[]}
     */
    _items: StackItem[];
    /**
     * Returns the number of elements in the stack.
     * @type {number}
     */
    get length(): number;
    /**
     * Determines if the stack is empty.
     * @returns {boolean} `true` if the stack is empty, otherwise `false`.
     */
    isEmpty(): boolean;
    /**
     * Retrieves an element from the stack at a specified position from the top.
     * @param {number} [digg=0] - The offset from the top of the stack (0 is the top).
     * @returns {StackItem | null} The element at the specified position, or null if it does not exist.
     */
    get(digg?: number): StackItem | null;
    /**
     * Removes the top element from the stack and returns it.
     * @returns {StackItem} The removed element.
     * @throws {Error} Thrown if the stack is empty.
     */
    pop(): StackItem;
    /**
     * Adds a new element to the top of the stack.
     * @param {StackItem} item - The element to add.
     */
    push(item: StackItem): void;
    /**
     * Updates the top element of the stack.
     * @param {Partial<StackItem>} upData - The data to update the top item with.
     * @param {boolean} [isFullOverWrite] - If true, the item is completely replaced; otherwise, it's merged.
     */
    update(upData: Partial<StackItem>, isFullOverWrite?: boolean): void;
    /**
     * Returns a deep-copied array of all elements in the stack.
     * @returns {StackItem[]} A deep-copied array of elements.
     */
    getSerializedData(): StackItem[];
    /**
     * @private
     * @param {StackItem[]} items
     * @returns {StackItem[]}
     */
    private _cloneItems;
}
/**
 * A Facade for managing a stack structure with multiple branches.
 * Each branch is managed as an independent `Stack` instance.
 * @typedef {{ branches: {[k in any]: any}, count: number, linkedCounts:{[k in number]:number}, linkMap:{[k in number]:number} }} SeriaraizedStackTree
 * @template {Stack} StackClass
 *
 */
export class StackTree {
    /**
     * Creates an instance of StackTree.
     * @param {SeriaraizedStackTree | null | false} [initData=null] - Initial data to restore the tree state.
     * @param {typeof Stack} [stackClass=Stack] - The stack class to be used internally.
     */
    constructor(initData?: SeriaraizedStackTree | null | false, stackClass?: typeof Stack);
    /**
     * @type {{n:number}}
     */
    _countRef: {
        n: number;
    };
    /**
     * @type {{[x in any]: StackClass}}
     *
     */
    _branches: { [x in any]: StackClass; };
    /**
     * @type {typeof StackClass}
     */
    _stackClass: typeof StackClass;
    /**
     * @type {number}
     */
    _branchId: number;
    /**
     * @type {number}
     */
    topId: number;
    /**
     * @type {{[k in number]:number}}
     */
    _linkedCounts: { [k in number]: number; };
    /**
     * @type {{[k in number]:number}}
    */
    _linkMap: { [k in number]: number; };
    /**
     * Determines if the current branch is empty.
     * @returns {boolean}
     */
    isEnd(): boolean;
    /**
     * Checks if the given ID matches the top-level branch ID.
     * @param {number} id
     * @returns {boolean}
     */
    isTop(id: number): boolean;
    /**
     * Forks a new branch from the current branch.
     * @param {number?} id
     * @returns {StackTree}
     */
    fork(id: number | null): StackTree;
    /**
     * Returns the `Stack` instance of the currently active branch.
     * @returns {StackClass}
     */
    getStack(): StackClass;
    /**
     * Returns the ID of the currently active branch.
     * @returns {number}
     */
    getBranchId(): number;
    /**
     * Gets the parent branch ID for a given branch ID.
     * @param {number} id The ID of the child branch.
     * @returns {number | undefined} The ID of the parent branch, or undefined if it's a top-level branch or doesn't exist.
     */
    getParentBranchId(id: number): number | undefined;
    /**
     * Gets the number of branches forked from a given branch ID.
     * @param {number} id - The ID of the parent branch.
     * @returns {number} The number of direct child branches.
     */
    getLinkedCount(id: number): number;
    setBranchId(id: any): void;
    /**
     * Updates the top element of the current branch.
     * @param {*} stackData
     * @param {true?} isFullOverWrite
     */
    update(stackData: any, isFullOverWrite: true | null): void;
    /**
     * Gets an element from the current branch.
     * @param {number} reversePosition - The offset from the top of the stack.
     * @returns {any | null}
     */
    get(reversePosition: number): any | null;
    /**
     * Returns the depth (number of elements) of the current branch.
     * @returns {number}
     */
    getBranchDepth(): number;
    /**
     * Restores the state of the `StackTree` from serialized data.
     * @param {SeriaraizedStackTree} datas - The serialized data.
     */
    setSerializedData(datas: SeriaraizedStackTree): void;
    /**
     * Returns the current state of the `StackTree` as a serializable object.
     * @returns {SeriaraizedStackTree}
     */
    getSerializedData(): SeriaraizedStackTree;
    /**
     * Shares branch data and a counter with another `StackTree` instance.
     * Primarily used internally by the `fork` method.
     * @param {{[x in any]: StackClass}} branches
     * @param {{n: number}} countRef
     * @param {{[k in any]:number}} linkMap
     * @param {{[k in any]:number}} linkedCounts
     */
    setReference(branches: { [x in any]: StackClass; }, countRef: {
        n: number;
    }, linkMap: { [k in any]: number; }, linkedCounts: { [k in any]: number; }): void;
    /**
     * Removes the branch with the specified ID.
     * @param {number} id
     */
    removeBranch(id: number): void;
    /**
     * Pushes data onto the current branch.
     * @param {*} data
     */
    push(data: any): void;
    /**
     * Pops data from the current branch.
     * @returns {any}
     */
    pop(): any;
}
