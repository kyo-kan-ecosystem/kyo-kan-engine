


class BaseWorkflow {
    /**
     * @param {*} calleId
     * @param {*} configure  
     * @returns {{executors?:any, params:any}}  
     */
    getConfigureParams(configure, calleId) {
        return { params: configure }
    }
    /**
     * @param {*} configure 
     * @param {*} executor - executor configure id 
     */
    addExecutor(configure, executor) {

    }
    /**
     * 
     * @param {*} context 
     */
    getExecuteFunction(context) { }
    /**
     * 
     * @param {*} context 
     */
    returnFromSubworkflow(context) { }
    /**
     * 
     * @param {*} context 
     */
    back(context) { }
    /**
     * 
     * @param {*} context 
     */
    rewind(context) { }
    /**
     * 
     * @param {*} context 
     */
    rewindReturn(context) { }

    /**
     * 
     * @param {*} context 
     */
    enterWorkflow(context) { }

}

module.exports = { BaseWorkflow }