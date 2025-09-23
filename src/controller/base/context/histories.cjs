const { RequestHistory } = require('./history/request.cjs');
const { StateHistory } = require('./history/state.cjs');
const { BordGlobalHistory } = require('./history/bords/global.cjs');
const { BordHistory } = require('./history/bords/bord.cjs');
const { BordSubWorkflowHistory } = require('./history/bords/sub_workflow.cjs');

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
     * @type {{global:BordGlobalHistory, bord:BordHistory, subworkflow:BordSubWorkflowHistory}}
     */
    bords


    /**
     * @param {{states:States, bords:}} args 
     * @param {States} states 
     * @param {Bords} bords 
     */
    constructor(args) {
        this._states = states;
        this._bords = bords;





    }
}

module.exports = { Histories }