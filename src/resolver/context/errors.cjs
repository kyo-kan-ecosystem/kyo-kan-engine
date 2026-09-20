
class ConfigureIdIsInvalidError extends Error {
    /**
     * @param {any} configureId
     */
    constructor(configureId) {
        super(`configureId ${configureId} is invalid`)
    }
}

class SubworkflowNameIsInvalidError extends Error {
    /**
     * @param {any} subworkflowName
     */
    constructor(subworkflowName) {
        super(`subworkflowName ${subworkflowName} is invalid`)
    }

}

class SubworkflowNameDoesNotExistsError extends Error {
    /**
     * @param {any} subworkflowName
     */
    constructor(subworkflowName) {
        super(`${subworkflowName} does not exists`)
    }

}

class SubworflowsDoesNotExistError extends Error {

    /**
     * 
     * @param {Object} param0 
     * @param {*} param0.configureId  
     */
    constructor({ configureId }) {
        super(`In configure ${configureId}, subworkflows does not set`)
    }
}


module.exports = {

    ConfigureIdIsInvalidError,
    SubworkflowNameIsInvalidError,
    SubworkflowNameDoesNotExistsError,
    SubworflowsDoesNotExistError


}