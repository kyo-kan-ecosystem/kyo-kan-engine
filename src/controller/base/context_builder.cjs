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
     * @param {import("./context/protocol").ContextSerialiableData} datas
     * @param {import("./context/protocol").ContextApi} api  
     * @returns {Context}
     */
    _buildContext(datas, api) {
        return new this._contextClass({ datas: datas, api: api })
    }

}

module.exports = { ContextBuilder }