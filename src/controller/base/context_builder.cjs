const { Context } = require("./context/index.cjs")


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
     * @param {import("./context/protocol").ContextInit<any,any>} contextInit 
     * @returns {Context}
     */
    _buildContext(contextInit) {
        return new this._contextClass({ initParams: contextInit })
    }

}

module.exports = { ContextBuilder }