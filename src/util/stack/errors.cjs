class StackTreeRootPopError extends Error {
    constructor() {
        super('This Tree is root. Cannot pop.')
        this.name = 'StackTreeRootPopError'

    }
}
class StackTreeRootSuperGetError extends Error {
    /**
     * @param {any} id
     */
    constructor(id) {
        super(`Branch with id ${id} is root. Cannot get super branchid`)
        this.name = 'StackTreeRootSuperGetError'

    }
}

class StackTreeBranchDoesNotExistError extends Error {
    /**
     * @param {any} id
     */
    constructor(id) {
        super(`Branch with id ${id} does not exist`)
        this.name = 'StackTreeBranchDoesNotExistError'

    }
}
module.exports = { StackTreeRootPopError, StackTreeRootSuperGetError, StackTreeBranchDoesNotExistError }