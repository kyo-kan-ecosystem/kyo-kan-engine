

class ContextBridgeResolver {
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
    resolveGoSubProcess(workflowId = undefined, subworkflowInit = undefined) {
        const id = workflowId || this.resolveSubworkflowId()
        this._context.states.now.push({ workflow: { id } })
        this._context.bords.push(subworkflowInit || this._context.states.controll.getSubworkflowInit())

    }
    resolveReturnFromSubProcess() {


        const subworkflowState = this._context.states.now.pop()
        const workflowState = this._context.states.now.get()

        this._context.bords.returnFromSub()

        return { workflowState, subworkflowState }


    }
    resolveStartProcess() {
        const rootWorkflow = this._context.repositries.configures.engine.get().root.workflow
        this._context.states.now.update({ workflow: { id: rootWorkflow } })
        this._context.states.controll.setExecuteMode('start')


    }
    resolvePassToResumeProcess() {
        const callbackMode = this._context.repositries.configures.engine.get().sequence.resume
        this._context.states.controll.setExecuteMode(callbackMode)



    }
    resolveResumeToPassProcess() {
        const callbackMode = this._context.repositries.configures.engine.get().sequence.callback
        this._context.states.controll.setExecuteMode(callbackMode)


    }
    resolveBackForWait() {
        let backStep = 0
        let log = this._context.histories.state.getBackLog(backStep)
        while (log !== false) {
            backStep++
            log.
                log = this._context.histories.state.getBackLog(backStep)

        }

    }



}

module.exports = { ContextBridgeResolver }