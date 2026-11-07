const { isVoid } = require("../../../../src/util/is_void.cjs")
const { PluginPackURLInvalidError } = require("./errors.cjs")
/**
 * 
 * @type {import('../protocol.d.ts').PluginPackDefaultModuleNameType} 
 */
const DEFAULT_PLUGINPACK_NAME = 'Pack'
class PluginpackLoader {
    /**
     * @type {import("./resolver/protocol.class.cjs").AbstractScenarioPluginpackResolver}
     */
    resolver


    /**
     * @type {string}
     * 
     */
    defaultPluginPackName
    /**
     * 
     * @param {import("./resolver/protocol.class.cjs").AbstractScenarioPluginpackResolver } resolver
     * @param {string} [defaultPluginPackName=]  
     */
    constructor(resolver, defaultPluginPackName = DEFAULT_PLUGINPACK_NAME) {
        this.resolver = resolver
        this._loadPlugin = this._loadPluginPack.bind(this)
        this.defaultPluginPackName = defaultPluginPackName

    }


    /**
     * 
     * @param {string[]} urls 
     */
    async load(urls) {
        const proms = []

        for (const url of urls) {
            const resolvedPath = this.resolver.resolve(url)
            if (resolvedPath === false) {
                throw new PluginPackURLInvalidError(url)
            }
            proms.push(this._loadPluginPack(resolvedPath))


        }
        return await Promise.all(proms)

    }
    /**
     * @param {import("./resolver/protocol").ResolvedPath}  resolvedPath
     */
    async _loadPluginPack(resolvedPath) {
        const mod = await import(resolvedPath.path)
        const modName = isVoid(resolvedPath.moduleName) ? this.defaultPluginPackName : resolvedPath.moduleName
        return mod[modName]


    }

}

module.exports = { PluginpackLoader }