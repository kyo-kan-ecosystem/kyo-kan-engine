const { ConfigureIdIsInvalidError, SubworkflowNameIsInvalidError, SubworkflowNameDoesNotExistsError } = require("./errors.cjs")


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
    resolveInContextSubworkflowId() {
        const subworkflowName = this._context.states.controll.getSubworkflowName()
        const configureId = this._context.states.controll.getExecutorId()
        const subworkflowId = this.resolveSubworkflowId(configureId, subworkflowName)
        return subworkflowId


    }
    /**
     * @param {any} configureId
     * @param {any} name
     */
    resolveSubworkflowId(configureId, name) {
        if (configureId === null || typeof configureId === 'undefined') {
            throw new ConfigureIdIsInvalidError(configureId)
        }
        if (name === null || typeof name === 'undefined') {
            throw new SubworkflowNameIsInvalidError(name)
        }


        return




    }
    /**
     * 
     * @param {*} workflowId
     * @param {*} subworkflowInit  
     */
    resolveGoSubProcess(workflowId = undefined, subworkflowInit = undefined) {
        const id = workflowId || this.resolveInContextSubworkflowId()
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




}

module.exports = { ContextBridgeResolver }