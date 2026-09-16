import { executeMode } from "../../src/states/protocol"
import { WorkflowConfigureFormatBase, WorkflowPluginConfigureReadable } from "../../src/workflow/plugin/protocol"
import { Context } from "../context/protocol"



export type SubWorkflowConfigures = { [k in string]: WorkflowPluginConfigureReadable }
export type BasicConfigure = { subworkflows?: SubWorkflowConfigures, datas: any }
export type ExecutorFunctionBaseType<OptionsType = any, RequestType = any, ContextType = Context> = (options: OptionsType, request: RequestType, context: ContextType) => void
export type ExecutorFunction<ConfiguresType = any, RequestType = any> = ExecutorFunctionBaseType<ConfiguresType, RequestType, Context>
export type GetSubworkflowFunctionType<OptionsType = any> = (options: OptionsType) => SubWorkflowConfigures
export type ExecutorBaseType = { [k in string]: ExecutorFunction }
export type WithGetSubworkflow = {
    getSubworkflow: GetSubworkflowFunctionType

}
export type MaybeWithGetSubworkflow = Partial<WithGetSubworkflow>
export type Exec

