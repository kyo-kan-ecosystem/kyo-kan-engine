const { RequestHistory } = require('./history/request.cjs');
const { StateHistory } = require('./history/state.cjs');
const { BordGlobalHistory } = require('./history/bords/global.cjs');
const { BordWorkflowHistory } = require('./history/bords/bord.cjs');

/**
 * @typedef {import('./state/states.cjs').States} States 
 * @typedef {import("./bords/bords.cjs").Bords} Bords 
 */
class Histories {
    /**
     * @private
     * @type {States}
     */
    _states
    /**
     * @private
     * @type {Bords}
     */
    _bords

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
     * @type {{global:BordGlobalHistory, bord:BordWorkflowHistory}}
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