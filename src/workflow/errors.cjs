class IdIsVoidError extends Error {
    /**
     * @param {any} id
     */
    constructor(id) {
        super(`id is required, but it is ${id}`)
    }
}

module.exports = { IdIsVoidError }