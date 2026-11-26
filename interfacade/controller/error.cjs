class ContextNotFoundError extends Error {
    /**
     * 
     * @param {*} id 
     */
    constructor(id) {
        super(`Contxt id ${id} is not found`)
    }

}

module.exports = { ContextNotFoundError }