


class StoreDependencyRegistratorClass {
    /**
     * @type {*}
     */
    memoryStore
    /**
     * @param {any} builder
     */
    registerMemoryStoreBuilder(builder) {
        this.memoryStoreBuilder = builder
    }
    /**
     * @type {any}
     */
    temporaryStoreBuilder
    /**
     * 
     * @param {*} builder 
     */
    registerTemporaryStoreBuilder(builder) {
        this.temporaryStoreBuilder = builder

    }
    /**
     * @type {any}
     */
    persistantStoreBuilder
    /**
     * 
     * @param {any} builder 
     */
    registorPersistantStoreBuilder(builder) {
        this.persistantStoreBuilder = builder

    }





}
const StoreDependencyRegistrator = new StoreDependencyRegistratorClass()
module.exports = { StoreDependencyRegistratorClass, StoreDependencyRegistrator }