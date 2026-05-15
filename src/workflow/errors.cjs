class IdIsVoidError extends Error {
    /**
     * @param {any} id
     */
    constructor(id) {
        super(`id is required, but is void. ${id}`)
    }
}

module.exports = { IdIsVoidError }