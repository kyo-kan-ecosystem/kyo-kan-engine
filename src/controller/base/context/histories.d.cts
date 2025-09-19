export type States = import("./state/states.cjs").States;
export type Bords = import("./bords/bords.cjs").Bords;
/**
 * @typedef {import('./state/states.cjs').States} States
 * @typedef {import("./bords/bords.cjs").Bords} Bords
 */
export class Histories {
    /**
     * @param {{states:States, bords:}} args
     * @param {States} states
     * @param {Bords} bords
     */
    constructor(args: {
        states: States;
        bords: any;
    });
    /**
     * @private
     * @type {States}
     */
    private _states;
    /**
     * @private
     * @type {Bords}
     */
    private _bords;
    /**
     * @type {StateHistory}
     *
     */
    state: StateHistory;
    /**
     * @type {RequestHistory}
     */
    request: RequestHistory;
    /**
     * @type {{global:BordGlobalHistory, bord:BordWorkflowHistory}}
     */
    bords: {
        global: BordGlobalHistory;
        bord: BordWorkflowHistory;
    };
}
import { StateHistory } from "./history/state.cjs";
import { RequestHistory } from "./history/request.cjs";
