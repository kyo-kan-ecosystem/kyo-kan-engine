
export type WorkflowState = {
    id: any;
    subwWorkflow?: {
        name: any;
        data?: any;
        callback?: string;
    };
    data?: any;



};

export type { AbstractWorkflow as Plugin } from "./plugin/protocol.class.cjs"
export type WorkflowConfigureParseResult<ParamsType = any> = {
    params?: ParamsType,
    executor?: any
}

export type WorkflowPluginConfigure<ParamsType = any> = WorkflowConfigureParseResult<ParamsType> & {
    plugin: any
}




export type SubworkflowDefinition {
    plugin: string,

}




