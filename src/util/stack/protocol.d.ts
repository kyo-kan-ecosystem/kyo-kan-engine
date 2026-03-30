/**
 * A Facade for managing a stack structure with multiple branches.
 * Each branch is managed as an independent `Stack` instance.
 * @typedef {{ branches: {[k in any]: any}, count: number, linkedCounts:{[k in number]:number}, linkMap:{[k in number]:number} }} SeriaraizableStackTree
 * 
 * 
 *
 */
export type SeriaraizableStackTreeData = {
    branches: { [k in any]: any },
    count: number,
    linkedCounts: { [k in number]: number },
    linkMap: { [k in number]: number }
}

/**
 * @templete BranchClass
 * @typedef {Object}  StackReference
 * @property {{[x in any]: BranchClass}} [StackReference.branches]
 * @property {{n: number}} [StackReference.countRef]
 * @property {{[k in any]:number}} [StackReference.linkMap] 
 * @property {{[k in any]:number}} [ StackReference.linkedCounts] 
 */
export type StackReference<BranchClass> = {
    branches: { [k in any]: BranchClass },
    countRef: { n: number },
    linkMap: { [k in any]: number },
    linkedCounts: { [k in any]: number }
}