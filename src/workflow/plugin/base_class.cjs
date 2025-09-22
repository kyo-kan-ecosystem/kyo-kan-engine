const { Context } = require("../../controller/protocol")



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
    /**
     * 
     * @param {import("../../controller/protocol").Context} context 
     * @param {*} plugin 
     * @param {*} calleFunction 
     */
    _callHook(context, plugin, calleFunction) {

    }

}

module.exports = { BaseWorkflow }