export class WorkflowConfiguresRepositry extends Repositry<any> {
    constructor(datas?: {});
    set(worflowName: any, data: any, calleId: any): {
        worflowName: any;
        calleId: any;
    };
    get(worflowName: any, calleId: any): any;
    getId(worflowName: any, calleId: any): string;
    getById(id: any): any;
}
import { Repositry } from "../../repositry/base.cjs";
