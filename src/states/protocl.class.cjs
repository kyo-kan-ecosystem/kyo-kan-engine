class ControllStateValueNotExistError extends Error {
    /**
     * @param {any} key
     */
    constructor(key) {
        super(`Controll state value for key "${key}" does not exist.`)
        this.name = 'ControllStateValueNotExistError'

    }

}

module.exports = { ControllStateValueNotExistError }