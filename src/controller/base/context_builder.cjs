const { Context } = require("./context/index.cjs")

/**
 * @typedef {import("./context/index.cjs").ContextInit} ContextInit
 */
class ContextBuilder {

    /**
     * @type {typeof Context}
     */
    _contextClass

    /**
     * 
     * @param {typeof Context?} contextClass 
     */
    constructor(contextClass) {
        this._contextClass = contextClass || Context
    }
    /**
     * @param {ContextInit} contextInit 
     * @returns {Context}
     */
    _buildContext(contextInit) {
        return new this._contextClass(contextInit)
    }

}

module.exports = { ContextBuilder }