import { WithConfigurePath } from "../../interfacde/configure/protocol";
import { PluginConfigureReadableProtocolBase, PluginConfigureBase } from "../../protocol/plugin/protocol.d.ts"

export * from './plugin/protocol.d.ts'
export type { AbstractWorkflow as WorkflowPlugin } from "./plugin/protocol.class.cjs"
export type WorkflowState<StateType = any, InitDataType = any> = {
    id: any;
    initData?: InitDataType;
    state?: StateType;



}

export type WorkflowStateMember = {
    workflow?: WorkflowState

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


