
export type { AbstractWorkflow as WorkflowPlugin } from "./plugin/protocol.class.cjs"
export type WorkflowState<StateType = any, InitDataType = any> = {
    id: any;
    initData?: InitDataType;
    state?: StateType;



}

export type WorkflowStateMember = {
    workflow?: WorkflowState

}


export type WorkflowConfigureParseResult<DatasType = any, ExecutorsType = any> = {
    datas?: DatasType
    executors?: ExecutorsType
}



export type WorkflowPluginConfigure<DatasType = any> = {
    plugin: any,
    datas: DatasType
}






export type SubworkflowDefinition {
    plugin: string,

}

export type WorkflowContextInit = {
    plugins?: Object<any, any>,
    configures?: Object<any, WorkflowPluginConfigure>,
    pluginsClass?: any,
    configuresClass?: any,

}


