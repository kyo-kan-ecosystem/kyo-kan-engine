const { Context } = require("./index.cjs")


/**
 * @template ContextClassType
 */
class ContextBuilder {

    /**
     * @type {ContextClassType}
     */
    _contextClass

    /**
     * 
     * @param {ContextClassType | undefined | null} contextClass      
     * */

    // @ts-ignore
    constructor(contextClass = Context) {
        // @ts-ignore
        this._contextClass = contextClass || Context
    }
    /**
     * @param {import("./protocol").ContextSerializableData} datas
     * @param {import("./protocol").ContextApi} api  
     * @returns {InstanceType<ContextClassType>}
     */
    _buildContext(datas, api) {
        // @ts-ignore
        return new this._contextClass({ datas: datas, api: api })
    }

}

module.exports = { ContextBuilder }