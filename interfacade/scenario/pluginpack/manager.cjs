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
     * 
     * @param {} packs 
     */
    constructor(packs) {
        this.packs = packs

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
        const pluginsMap = {}
        for (const pack of packs) {

            /**
             * @type {[{[k in string]:import("./protocol").PluginPackageConfigureType}, PropertyKey][]}
             */
            const pluginAndPropertyKeys = [[pack.getWorkflows(), 'workflows'], [pack.getExecutors(), 'executors']]
            for (const [pluginDatas, propertyKey] of pluginAndPropertyKeys) {
                const plugins = pluginsMap[propertyKey] || {}
                for (const key in pluginDatas) {


                    const element = pluginDatas[key]
                    if (typeof element === 'function') {
                        continue
                    }


                    const modulePath = this._regularaizeModulePath(element.modulePath, pack.baseDir)
                    plugins[key] = Object.assign({}, element, { modulePath })



                }
                pluginsMap[propertyKey] = plugins



            }




        }

        const modulePathToIds = {}
        for (const propertyKey in pluginsMap) {
            const plugins = pluginsMap[propertyKey]


            for (const id in plugins) {
                const plugin = plugins[id]
                const idsMap = modulePathToIds[plugin.modulePath] || {};
                const ids = idsMap[propertyKey] || [];


                ids.push(id)
                idsMap[propertyKey] = ids
                modulePathToIds[pluginsMap.modulePath] = idsMap


            }


        }
        for (const modulePath in modulePathToIds) {




        }



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
    async _loadModule(modulePath) {

        const module = await import(modulePath)
        return { module, modulePath }


    }
}