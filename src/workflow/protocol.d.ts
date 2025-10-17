
export type WorkflowState = {
    id: any;
    subwWorkflow?: {
        name: any;
        data?: any;
        callback?: string;
    };
    data?: any;



};

export type { AbstarctWorkflow as Plugin } from "./plugin/base_classes.cjs"

export type WorkflowPluginConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: any
}


export type SubworkflowDefinition {
    plugin: string,

}




