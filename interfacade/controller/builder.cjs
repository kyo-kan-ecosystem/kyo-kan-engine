const { StoreDependencyRegistrator } = require("../store/dependency_registator.cjs")

/**
 * @param {*} memoryStoreBuilder
 * @param {*} temporaryStoreBuilder
 * @param {*} senarioLoaderBuilder
 * @param {any} consistantStoreBuilder
 */
function Builder(memoryStoreBuilder, temporaryStoreBuilder, consistantStoreBuilder, senarioLoaderBuilder) {
    StoreDependencyRegistrator.registerMemoryStoreBuilder(memoryStoreBuilder)
    StoreDependencyRegistrator.registerTemporaryStoreBuilder(temporaryStoreBuilder)
    StoreDependencyRegistrator.registorPersistantStoreBuilder(consistantStoreBuilder)
    const sceanrioLoader = senarioLoaderBuilder()


}


module.exports = { Builder }