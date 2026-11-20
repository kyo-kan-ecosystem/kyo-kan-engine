class AbstractRecursiveBuilder {
    /**
     * @type {import("./protocol").RecursiveBuilderConfig}
     */
    config
    /**
     * 
     * @param {import("./protocol").RecursiveBuilderConfig} config 
     */
    constructor(config) {
        this.config = config
        this.build = this.build.bind(this)

    }
    /**
     * 
     * @param {import("./protocol").RecursiveBuilderArgs} argObject 
     */
    build({ args = {}, dependArgs = {} }) {
        /**
         * @type {Object<any, any>}
         */
        const dependObjects = {}
        const dependBulders = this.config.dependClasses || {}
        for (const dependKey in dependBulders) {


            const dependArg = dependArgs[dependKey]
            const dependBuilder = dependBulders[dependKey]


            dependObjects[dependKey] = dependBuilder(dependArg)





        }
        return this._constructObject(dependObjects, args)



    }
    /**
     * @abstract
     * @param {any} dependObjects
     * @param {any} args
     */
    _constructObject(dependObjects, args) {
        throw 'Not Implement'
    }

}

module.exports = { AbstractRecursiveBuilder }