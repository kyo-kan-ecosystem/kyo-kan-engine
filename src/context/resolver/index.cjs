

class ContextResolver {
    /**
     * @type {import("../protocol").ContextDataInterFace}
     */
    _context
    /**
     * @param {import("../protocol").ContextDataInterFace} context
     */
    constructor(context) {
        this._context = context


    }
    resolveSubworkflowId() {
        const subworkflowName = this._context.states.controll.getSubworkflowName()
        const configureId = this._context.states.controll.getExecutorId()
        const subworkflowId = this._context.executors.resolveSubworkflowId(configureId, subworkflowName)
        return subworkflowId


    }


}

module.exports = { ContextResolver }