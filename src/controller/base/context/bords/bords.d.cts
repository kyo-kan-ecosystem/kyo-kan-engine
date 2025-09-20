export type ContextBordFocus = any;
export type BordInit = {
    global?: any;
    items?: any;
};
/**
 * @typedef {any} ContextBordFocus
 * @typedef {{global?:any,items?:Object<any, ContextBordFocus[]>}} BordInit
 */
export class Bords extends StackTree {
    /**
     * @param {BordInit?} bordInit
     */
    constructor(bordInit: BordInit | null);
    /**
     * @private
     * @type {boolean}
     */
    private _isBordUpdate;
    /**
     * @private
     * @type {boolean}
     */
    private _isGlobalUpdate;
    _global: any;
    _subWorkflow: any;
    global(): any;
    updateGlobal(data: any): void;
    checkIsUpdate(): {
        global: boolean;
        bord: boolean;
    };
    update(data: any): void;
    setSubWorkFlow(data: any): void;
    getSubWorkflow(): any;
    push(data: any): void;
    /**
     * @returns {BordInit}
     */
    getSerializedData(): BordInit;
}
import { StackTree } from "../../../../util/stack.cjs";
