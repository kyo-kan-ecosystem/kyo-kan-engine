

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
    /**
     * 
     * @param {*} workflowId
     * @param {*} subworkflowInit  
     */
    resolveGoSubworkflowProcess(workflowId = undefined, subworkflowInit = undefined) {
        const id = workflowId || this.resolveSubworkflowId()
        this._context.states.now.push({ workflow: { id } })
        this._context.bords.push(subworkflowInit || this._context.states.controll.getSubworkflowInit())

    }
    resolveReturnFromSubworkflowProcess() {
        const subworkflowState = this._context.states.pop()
        const workflowState = this._context.states.pop()
        return { workflowState, subworkflowState }


    }


}

module.exports = { ContextResolver }