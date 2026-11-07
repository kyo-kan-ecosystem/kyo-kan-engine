class PluginPackURLInvalidError extends Error {
    constructor(url) {
        super(`Url ${url} of PluginPack is invalid`)
    }
}

module.exports = { PluginPackURLInvalidError }