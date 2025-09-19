export class ExecutorConfigureRepositry extends Repositry<any> {
    /**
     *
     * @param {import("./protocol").WorkNodeRepositryParams} params
     */
    constructor(params?: import("./protocol").WorkNodeRepositryParams);
    /**
     * @type {number}
     */
    length: number;
    add(data: any): number;
}
import { Repositry } from "../../repositry/base.cjs";
