const { Context } = require("./index.cjs")


/**
 * @template [ContextClassType=typeof Context<any, any>]
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
    constructor(contextClass) {
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