




class BaseWorkflow {
    /**
     * @abstract
     * @param {import("../../controller/protocol").Context} context 
     * @param {*} request
     * @param {*} configure
     * @returns {{state:any, response:any[]}} 
     */
    go(context, request, configure) {
        return { state: null, response: [] }
    }

    /**
     * @abstract
     * @param {import("../../controller/protocol").Context} context 
     * @param {*} request
     * @returns {{state:any, response:any[]}}
    */
    returnFromSubworkflow(context, request) {
        return { state: null, response: [] }
    }


}

module.exports = { BaseWorkflow }