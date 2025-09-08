const { Repositry } = require("../../repositry/base.cjs")
class ExecutorWorknodeRepositry extends Repositry {
    /**
     * 
     * @param {import("./protocol").WorkNodeRepositryParams} params 
     */
    constructor(params = {}) {
        const length = params.length | 0
        const _datas = params.datas | {}
        super(_datas)
        /**
         * @type {number}
         */
        this.length = length


    }
    add(data) {
        const id = this.length
        this.set(id, data)
        this.length += 1
        return id
    }

}

module.exports = { ExecutorWorknodeRepositry }