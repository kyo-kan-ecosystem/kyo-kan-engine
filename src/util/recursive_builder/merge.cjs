import AbstractRecursiveBuilder from "./base.cjs";

class RecursiveBuilderMerge extends AbstractRecursiveBuilder {
    classFunction
    /**
     * 
     * @param {*} classFunction 
     */
    constructor(classFunction, config) {
        super(config)
        this.classFunction = classFunction
    }

    _constructObject(dependClasses, args) {
        const argObject = Object.assign({}, dependClasses, args || {})
        return new this.classFunction(args)

    }
}

module.exports = { RecursiveBuilderMerge }