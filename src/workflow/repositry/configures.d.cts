export class WorkflowConfiguresRepositry extends Repositry {
    /**
     *
     * @param {{calleId:any, name:any}} idParams
     * @param {*} data
     *
     * @returns
     */
    set(idParams: {
        calleId: any;
        name: any;
    }, data: any): void;
    getId(worflowName: any, calleId: any): string;
}
import { Repositry } from "../../repositry/base.cjs";
