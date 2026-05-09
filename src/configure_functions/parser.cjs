import { Workflows } from '../workflow/context.cjs'

const { BootExecutorConfigureRepositry } = require('../executor/repositry/boot.cjs')
const { ExecutorConfigureRepositry } = require('../executor/repositry/configure.cjs')
const { WorkflowConfiguresRepositry } = require('../workflow/repositry/configures.cjs')

const { WorkflowPluginRepositry } = require('../workflow/repositry/plugins.cjs')

const { ExecutorPluginRepositry } = require('../executor/repositry/plugin.cjs')

const { EngineConfigureRepositry } = require('../engine/repositry/configure.cjs')

class ConfigureParser {

    /**
     * @type {typeof EngineConfigureRepositry}
     */
    _engineConfigureClass

    /**
     * @type {typeof ExecutorPluginRepositry}
     */
    _executorPluginRepositryClass

    /**
     * @type {typeof WorkflowPluginRepositry}
     */
    _workflowPluginRepositryClass

    /**
     * @type {typeof WorkflowConfiguresRepositry}
     */
    _workflowConfiguresRepositryClass

    /**
     * @type {typeof ExecutorConfigureRepositry}
     */
    _executorConfiguresRepositryClass

    /**
     * @type {typeof BootExecutorConfigureRepositry}
     */
    _bootExecutorConfiguresRepositryClass



    constructor({
        engineConfigureClass = EngineConfigureRepositry,
        workflowsClass = Workflows
    } = {}) {
        this._engineConfigureClass = engineConfigureClass
        this._executorPluginRepositryClass = executorPluginRepositryClass
        this._workflowPluginRepositryClass = workflowPluginRepositryClass
        this._workflowConfiguresRepositryClass = workflowConfiguresRepositryClass
        this._executorConfiguresRepositryClass = executorConfiguresRepositryClass
        this._bootExecutorConfiguresRepositryClass = bootExecutorConfiguresRepositryClass


    }
    /**
     * 
     * @param {import('../../protocol/configure/protocol.d.ts').ConfigureFormat} configure 
     */
    parse(configure) {



    }


}