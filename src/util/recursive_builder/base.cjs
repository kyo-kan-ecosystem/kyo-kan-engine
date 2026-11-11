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
    build(argObject) {
        const dependObjects = {}
        for (const dependKey in argObject.dependArgs || {}) {


            const dependArg = argObject.dependArgs[dependKey]
            const dependBuilder = this.config.dependClasses[dependKey]
            dependObjects[dependKey] = dependBuilder(dependArg)





        }
        return this._constructObject(dependObjects, argObject.args)



    }
    /**
     * @abstract
     */
    _constructObject(dependObjects, args) {
        throw 'Not Implement'
    }

}

module.exports = AbstractRecursiveBuilder