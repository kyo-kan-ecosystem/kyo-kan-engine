import { executeMode } from "../../src/controller/protocol"
import { WorkflowConfigureFormatBase } from "../../src/workflow/plugin/protocol"
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

export type ExecutorFunction<OptionsType = any, RequestType = any, ContextType = Context> = (options: OptionsType, context: ContextType) => void

export type ExecutorType = { [k in string]: ExecutorFunction }