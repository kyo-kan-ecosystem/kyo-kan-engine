class LoaderForNamespaceDoesNotExistError extends Error {
    /**
     * 
     * @param {*} nameSpace 
     */
    constructor(nameSpace) {
        super(`Loader for ${nameSpace} does not exist`)
    }

}

module.exports = { LoaderForNamespaceDoesNotExistError }