
export type { AbstractWorkflow as WorkflowPlugin } from "./plugin/protocol.class.cjs"
export type WorkflowState<StateType = any, InitDataType = any> = {
    id: any;
    initData?: InitDataType;
    state?: StateType;



}


export type WorkflowConfigureParseResult<ParamsType = any, ExecutorsType = any> = {
    params?: ParamsType
    executors?: ExecutorsType
}



export type WorkflowPluginConfigure<DataType = any> = {
    plugin: any
} & DataType






export type SubworkflowDefinition {
    plugin: string,

}




