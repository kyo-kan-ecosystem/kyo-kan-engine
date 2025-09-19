export class Workflow {
    getExecuteFunction(context: any): void;
    returnFromSubworkflow(context: any): void;
    back(context: any): void;
    rewind(context: any): void;
    rewindReturn(context: any): void;
    enterWorkflow(context: any): void;
}
