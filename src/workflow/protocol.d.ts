import { WithConfigurePath } from "../../interfacde/configure/protocol";
import { PluginConfigureBaseProtocol } from "../../protocol/plugin/protocol.d.ts"
export type { AbstractWorkflow as WorkflowPlugin } from "./plugin/protocol.class.cjs"
export type WorkflowState<StateType = any, InitDataType = any> = {
    id: any;
    initData?: InitDataType;
    state?: StateType;



}

export type WorkflowStateMember = {
    workflow?: WorkflowState

}
export type WorkflowConfigureExtention<ExecutorsType = any> = {

    executors?: ExecutorsType
}

export type WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any> = PluginConfigureBaseProtocol<OptionsType, WorkflowConfigureExtention<ExecutorsType>>



export type WorkflowConfigureParseResult<ExecutorsType = any, OptionsType = any> = WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any >


export type WorkflowPluginConfigureReadable<OptionsType = any, ExecutorsType = any> = WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any >


export type WorkflowPluginConfigure<ExecutorsType = any, OptionsType = any> = WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any > & WithConfigurePath


export type SubworkflowDefinition {
    plugin: string,

}

export type WorkflowContextInit = {
    plugins?: Object<any, any>,
    configures?: Object<any, WorkflowPluginConfigure>,
    pluginsClass?: any,
    configuresClass?: any,

}


