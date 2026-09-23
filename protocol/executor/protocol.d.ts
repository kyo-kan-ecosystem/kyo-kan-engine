import type { ResolverParseContext } from "../../src/resolver/interfacade/parse_context.cjs"
import { executeMode } from "../../src/states/protocol"
import { Context } from "../context/protocol"

export * from '../../src/executor/protocol'

export type SubWorkflowConfigures = { [k in string]: { workflow: any, callback?: string } }
export type BasicConfigure = { subworkflows?: SubWorkflowConfigures, datas: any }
export type ExecutorFunctionBaseType<OptionsType = any, RequestType = any, ContextType = Context> = (options: OptionsType, request: RequestType, context: ContextType) => void
export type ExecutorFunction<ConfiguresType = any, RequestType = any> = ExecutorFunctionBaseType<ConfiguresType, RequestType, Context>
export type GetSubworkflowFunctionType<OptionsType = any> = (options: OptionsType, workingReolver: ResolverParseContext) => SubWorkflowConfigures
export type WithGetSubworkflow = {
    getSubworkflow: GetSubworkflowFunctionType

}
export type MaybeWithGetSubworkflow = Partial<WithGetSubworkflow>


