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
