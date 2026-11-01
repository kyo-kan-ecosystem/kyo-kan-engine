const { isVoid } = require("../../../src/util/is_void.cjs")
const { ScenarioPluginPack } = require("./pluginpack.cjs")
const path = require('node:path')

/**
 * @typedef {"executors"| "workflows"} PropertyKey
 */
class PluginPackManager {
    /**
     * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
     */
    workflows

    /**
      * @type {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }}
      */
    executors

    /**
     * @type {string[]}
     */
    urls
    /**
     * 
     * @param {Object} param0 
     * @param {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }} param0.workflows 
     * @param {{[k in string]:import("../../../protocol/plugin/protocol").PluginMager }} param0.executors 
     */
    constructor({ workflows, executors }, urls) {
        this.workflows = workflows
        this.executors = executors
        this.urls = urls

    }
    /**
     * 
     * @param {PropertyKey} key 
     */
    async _getPlugins(key) {


        /**
         * @type {{[id in string]:import("../../../protocol/plugin/protocol").PluginManager}}
         */
        const target = this[key]

        const proms = []
        for (const id in target) {

            /**
             * @type {import("../../../protocol/plugin/protocol").PluginManager}
             */
            const manager = target[id];
            proms.push(this._buildPlugin(id, manager))

        }
        const pluginAndIds = await Promise.all(proms)

        return Object.fromEntries(pluginAndIds)


    }
    /**
     * @param {*} id 
     * @param {import("../../../protocol/plugin/protocol").PluginManager} manager 
     */
    async _buildPlugin(id, manager) {
        const plugin = await manager.build()
        return [id, plugin]

    }
}

class PluginPackManagerBuilder {
    constructor(managerClass = PluginPackManager) {
        this.managerClass = managerClass
    }

    /**
     * 
     * @param {ScenarioPluginPack[]} packs 
     */
    async convertFromObjects(packs) {

        /**
         * @type {{[propertyKey in string]:{[id in string]:import("./protocol").PluginPackageConfigureType}}}
         */
        const pluginsConfigureMap = {}

        const idToUrl = new Map()

        for (const pack of packs) {

            /**
             * @type {[{[k in string]:import("./protocol").PluginPackageConfigureType}, PropertyKey][]}
             */
            const pluginAndPropertyKeys = [[pack.getWorkflows(), 'workflows'], [pack.getExecutors(), 'executors']]
            for (const [pluginDatas, propertyKey] of pluginAndPropertyKeys) {
                const plugins = pluginsConfigureMap[propertyKey] || {}
                for (const id in pluginDatas) {


                    const pluginData = pluginDatas[id]
                    if (typeof pluginData === 'function') {
                        continue
                    }


                    const modulePath = this._regularaizeModulePath(pluginData.modulePath, pack.baseDir)
                    plugins[id] = Object.assign({}, pluginData, { modulePath })
                    idToUrl.set(id, pack.url)



                }
                pluginsConfigureMap[propertyKey] = plugins



            }




        }
        const urlMap = new Map()
        for (const url of Object.values(idToUrl)) {
            urlMap.set(url, true)
        }
        const urls = Array.from(urlMap.keys())

        /**
         * @type {{[modulePath in string]:{[propertyKey in PropertyKey]:string[]}}}
         */
        const modulePathToIds = {}
        for (const propertyKey in pluginsConfigureMap) {
            const plugins = pluginsConfigureMap[propertyKey]


            for (const id in plugins) {
                const plugin = plugins[id]
                const idsMap = modulePathToIds[plugin.modulePath] || {};
                const ids = idsMap[propertyKey] || [];


                ids.push(id)
                idsMap[propertyKey] = ids
                modulePathToIds[plugin.modulePath] = idsMap


            }


        }
        const proms = []
        for (const modulePath in modulePathToIds) {
            proms.push(this._loadModule(modulePath))





        }
        const moduleAndPaths = await Promise.all(proms)
        const pluginsMap = {}
        for (const { module, modulePath } of moduleAndPaths) {
            for (const [propertyKey, ids] in Object.entries(modulePathToIds[modulePath])) {
                const plugins = pluginsMap[propertyKey] || {}
                const pluginConfigures = pluginsConfigureMap[propertyKey]
                for (const id in ids) {
                    const pluginConfigure = pluginConfigures[id]
                    const plugin = isVoid(pluginConfigure.moduleName) ? module : module[pluginConfigure.moduleName]
                    plugins[id] = plugin




                }
                pluginsMap[propertyKey] = plugins




            }


        }

        return new this.managerClass(pluginsMap, urls)



    }
    /**
     * 
     * @param {string} modulePath 
     * @param {string | undefined} basedir 
     */
    _regularaizeModulePath(modulePath, basedir = undefined) {
        if (modulePath.indexOf('./') === -1) {
            return modulePath

        }
        const targetPaths = []
        if (isVoid(basedir) === false) {
            targetPaths.push(basedir)
        }
        targetPaths.push(modulePath)
        const targetPath = path.resolve(...targetPaths)
        return path.relative(__dirname, targetPath)
    }
    /**
     * 
     * @param {string} modulePath 
     * @returns 
     */
    async _loadModule(modulePath) {

        const module = await import(modulePath)

        return { module, modulePath }


    }
}

module.exports = { PluginPackManagerBuilder, PluginPackManager }