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
        super(`This Tree id ${id} is root. Cannot get super branchid`)
        this.name = 'StackTreeRootSuperGetError'

    }
}
module.exports = { StackTreeRootPopError, StackTreeRootSuperGetError }