import { WithConfigurePath } from "../../interfacde/configure/protocol";
import { PluginConfigureBaseReadableProtocol, PluginConfigureBase } from "../../protocol/plugin/protocol.d.ts"
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

    executors: ExecutorsType
}

export type WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any> = PluginConfigureBaseReadableProtocol<OptionsType, WorkflowConfigureExtention<ExecutorsType>>



export type WorkflowConfigureParseResult<ExecutorsType = any, OptionsType = any> = WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any >


export type WorkflowPluginConfigureReadable<ExecutorsType = any, OptionsType = any> = WorkflowPluginConfigureBase<ExecutorsType = any, OptionsType = any >
export type RootWorkflowConfigure<ExecutorsType = any, OptionsType = any> = Omit<PluginConfigureBase<OptionsType = any > , 'plugin' > & WorkflowConfigureExtention<ExecutorsType>

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


