const { Repositry } = require("../../repositry/base.cjs")

/**
 * @extends {Repositry<import("../protocol").ExecutorConfigureFormatType>}
 */
class ExecutorConfigureRepositry extends Repositry {
    /**
     * 
     * @param {Partial<import("./protocol").WorkNodeRepositryParams>} params 
     */
    constructor(params = {}) {
        const length = params.length || 0
        const _datas = params.datas || {}
        super(_datas)
        /**
         * @type {number}
         */
        this.length = length


    }
    /**
     * @param {import("../protocol").ExecutorConfigureFormatType} data
     */
    add(data) {
        const id = this.length
        this.set(id, data)
        this.length += 1
        return id
    }
    /**
     * 
     * @param {*} name 
     * @param {import("../protocol").ExecutorConfigureFormatType} data 
     */
    addWithName(name, data) {
        this.set(name, data)

    }


}



module.exports = { ExecutorConfigureRepositry }