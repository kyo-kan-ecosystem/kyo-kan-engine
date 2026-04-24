
export type WorkflowState<StateType = any, InitDataType = any> = {
    id: any;
    initData?: InitDataType;
    state?: StateType;



};

export type { AbstractWorkflow as Plugin } from "./plugin/protocol.class.cjs"
export type WorkflowConfigureParseResult<ParamsType = any, ExecutorsType = any> = {
    params?: ParamsType
    executors?: ExecutorsType
}



export type WorkflowPluginConfigure<ParamsType = any> = WorkflowConfigureParseResult<ParamsType> & {
    plugin: any
}




export type SubworkflowDefinition {
    plugin: string,

}




