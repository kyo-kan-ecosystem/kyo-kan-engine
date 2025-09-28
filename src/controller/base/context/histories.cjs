const { RequestHistory } = require('../../../history/request.cjs');
const { StateHistory } = require('../../../history/state.cjs');
const { BordGlobalHistory } = require('../../../history/bords/global.cjs');
const { BordCurrentWorkflowHistory } = require('../../../history/bords/current_workflow.cjs');
const { BordSubWorkflowHistory } = require('../../../history/bords/sub_workflow.cjs');


/**
 * @typedef {{state:StateHistory, request:RequestHistory, bords:{global:BordGlobalHistory, }}}
 */
/**
 * @typedef {import('./state/states.cjs').States} States 
 * @typedef {import("./bords/bords.cjs").Bords} Bords 
 */
class Histories {


    /**
     * @type {StateHistory}
     * 
     */
    state

    /**
     * @type {RequestHistory}
     */
    request

    /**
     * @type {{global:BordGlobalHistory, curentWorkflow:BordCurrentWorkflowHistory, subworkflow:BordSubWorkflowHistory}}
     */
    bords

    /**
     * @type {}
     */


    /**
     * @param {*} historyInit
     * @param {{states:States, bords:Bords}} stackTrees 
     * @param {*} historyClasses  
     */
    constructor(historyInit, stackTrees, historyClasses) {
        this._states = states;
        this._bords = bords;





    }
    record() {

    }

}

module.exports = { Histories }