import { executeMode } from "../../src/controller/protocol"
import { Context } from "../context/protocol"

export type ExecutorConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: string
    subworkflows?: { [k in any]: any }
    enterFunction?: string
}
export type ExecutorFunctionResponse<WorkflowParamsType = any> = {
    mode: executeMode,
    workflow?: string,
    workflowParams?: WorkflowParamsType,
    callback?: string,

}
export type ExecutorFunction<OptionsType = any, RequestType = any, ContextFunctionType = any, ReporterType = any> = (options: OptionsType, context: Context<ContextFunctionType, ReporterType>) => any 