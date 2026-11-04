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
         * @type {{[id in string]:import("./protocol").PluginPackageDataTypes}}
         */
        const pluginDatasMap = {}

        const idToUrl = new Map()

        for (const pack of packs) {

            /**
             * @type {[import("./protocol").PluginPackageDataTypes, PropertyKey][]}
             */
            const pluginAndPropertyKeys = [[pack.getWorkflows(), 'workflows'], [pack.getExecutors(), 'executors']]
            for (const [pluginDatas, propertyKey] of pluginAndPropertyKeys) {
                const pluginDatas = pluginDatasMap[propertyKey] || {}
                for (const id in pluginDatas) {


                    const pluginData = pluginDatas[id]
                    if (typeof pluginData === 'function') {
                        continue
                    }

                    if ('modulePath' in pluginData) {
                        const modulePath = this._regularaizeModulePath(pluginData.modulePath, pack.baseDir)
                        pluginDatas[id] = Object.assign({}, pluginData, { modulePath })

                    }
                    else {
                        pluginDatas[id] = pluginData
                    }

                    idToUrl.set(id, pack.url)



                }
                pluginDatasMap[propertyKey] = pluginDatas



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
        const pluginsMap = {}
        for (const propertyKey in pluginDatasMap) {
            const pluginDatas = pluginDatasMap[propertyKey]
            const plugins = pluginsMap[propertyKey]


            for (const id in pluginDatas) {
                const pluginData = pluginDatas[id]
                if ('modulePath' in pluginData) {
                    const idsMap = modulePathToIds[pluginData.modulePath] || {};
                    const ids = idsMap[propertyKey] || [];


                    ids.push(id)
                    idsMap[propertyKey] = ids

                    modulePathToIds[pluginData.modulePath] = idsMap
                }
                else {
                    plugins[id] = pluginData.manager
                }




            }


        }
        const proms = []
        for (const modulePath in modulePathToIds) {
            proms.push(this._loadModule(modulePath))
        }
        const moduleAndPaths = await Promise.all(proms)

        for (const { module, modulePath } of moduleAndPaths) {
            for (const [propertyKey, ids] in Object.entries(modulePathToIds[modulePath])) {
                const plugins = pluginsMap[propertyKey] || {}
                const pluginConfigures = pluginDatasMap[propertyKey]
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
        if (modulePath.indexOf('.') === -1) {
            return modulePath

        }
        const targetPaths = []
        if (isVoid(basedir) === false) {
            targetPaths.push(basedir)
        }
        targetPaths.push(modulePath)
        const targetPath = path.resolve(...targetPaths)
        return path.relative(__dirname, targetPath).replaceAll('\\', '/')
    }
    /**
     * 
     * @param {string} modulePath 
     * 
     */
    async _loadModule(modulePath) {

        const module = await import(modulePath)

        return { module, modulePath }


    }
}

module.exports = { PluginPackManagerBuilder }