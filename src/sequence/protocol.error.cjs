class BootCallbackDoesNotExistsError extends Error {
    /**
     * @param {any} plugin
     * @param {any} callback
     */
    constructor(plugin, callback) {
        super(`Boot callback "${callback}" does not exist in plugin "${plugin}"`);
        this.name = 'BootCallbackDoesNotExistsError';
        this.plugin = plugin;
        this.callback = callback;
    }

}


module.exports = { BootCallbackDoesNotExistsError }
