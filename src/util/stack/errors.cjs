class StackTreeRootPopError extends Error {
    constructor() {
        super('This Tree is root. Cannot pop.')
        this.name = 'StackTreeRootPopError'

    }
}

module.exports = { StackTreeRootPopError }