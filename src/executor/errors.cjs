class _resolveSubworkflowIdDoesNotImplementedError extends Error {
    constructor() {
        super('_resolveSubworkflowId does not implemented');
        this.name = '_resolveSubworkflowIdDoesNotImplementedError';
    }

}
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
class ConfigureDoesNotExistsError extends Error {
    /**
     * @param {any} configureId
     */
    constructor(configureId) {
        super(`configure ${configureId} does not exists`)

    }
}
class PluginDoesNotExistsError extends Error {
    /**
     * @param {any} pluginId
     */
    constructor(pluginId) {
        super(`plugin ${pluginId} does not exists`)

    }
}
class PluginIdIsInvalidError extends Error {
    /**
     * @param {any} pluginId
     */
    constructor(pluginId) {
        super(`plugin ${pluginId} is invalid`)

    }
}

class PlugidDoesNotSetInConfigureError extends Error {
    /**
     * @param {any} configureId
     * @param {any} configure
     */
    constructor(configureId, configure) {
        super(`Plugin Id Does not set in configure. ${configureId} ${JSON.stringify(configure)}`)
    }

}

module.exports = {
    _resolveSubworkflowIdDoesNotImplementedError,
    ConfigureIdIsInvalidError,
    SubworkflowNameIsInvalidError,
    SubworkflowNameDoesNotExistsError,
    ConfigureDoesNotExistsError,
    PluginDoesNotExistsError,
    PluginIdIsInvalidError,
    PlugidDoesNotSetInConfigureError

}