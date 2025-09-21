


class BaseWorkflow {
    /**
     * 
     * @returns {{executors?:any, params:any}}  
     */
    getConfigureParams(configure, calleId) {

    }
    /**
     * 
     * @param {*} executor - executor configure id 
     */
    addExecutor(configure, executor) {

    }

    getExecuteFunction(context) { }
    returnFromSubworkflow(context) { }
    back(context) { }
    rewind(context) { }
    rewindReturn(context) { }
    enterWorkflow(context) { }

}

module.exports = { BaseWorkflow }