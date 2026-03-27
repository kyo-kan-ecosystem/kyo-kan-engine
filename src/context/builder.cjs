const { Context } = require("./index.cjs")


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
     * @param {import("./protocol").ContextSerialiableData} datas
     * @param {import("./protocol").ContextApi} api  
     * @returns {Context}
     */
    _buildContext(datas, api) {
        return new this._contextClass({ datas: datas, api: api })
    }

}

module.exports = { ContextBuilder }