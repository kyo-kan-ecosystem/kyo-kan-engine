import { executeMode } from "../../src/controller/protocol"
import { WorkflowConfigureFormatBase, WorkflowConfigureFormatUnion } from "../../src/workflow/plugin/protocol"
import { Context } from "../context/protocol"

export type ExecutorConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: string
    subworkflows?: { [k in string]: WorkflowConfigureFormatBase }
    enterFunction?: string
}
export type ExecutorFunctionResponse<WorkflowParamsType = any> = {
    mode: executeMode,
    workflow?: string,
    workflowParams?: WorkflowParamsType,
    callback?: string,

}
export type SubWorkflowConfigures = { [k in string]: Partial<WorkflowConfigureFormatUnion> }
export type BasicConfigure = { subworkflows?: SubWorkflowConfigures, params: any }
export type ExecutorFunctionBaseType<ConfiguresType = any, RequestType = any, ContextType = Context> = (configures: ConfiguresType, request: RequestType, context: ContextType) => void
export type ExecuterFunction<ConfiguresType = any, RequestType = any> = ExecutorFunctionBaseType<ConfiguresType, RequestType, Context>
export type GetSubworkflowFunctionType<ConfiguresType = any> = (configure: ConfiguresType) => { [k in string]: WorkflowConfigureFormatUnion }
export type ExecutorBaseType = { [k in string]: ExecutorFunction }
export type WithGetSubworkflow = {
    getSubworkflow: GetSubworkflowFunctionType

}

export type MabeWithGetSubworkflow = Partial<WithGetSubworkflow>


