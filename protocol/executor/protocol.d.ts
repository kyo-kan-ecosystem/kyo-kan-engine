import type { ResolverParseContext } from "../../src/resolver/interfacade/parse_context.cjs"
import { executeMode } from "../../src/states/protocol"
import { Context } from "../context/protocol"

export * from '../../src/executor/protocol'

export type SubWorkflowConfigures = { [k in string]: { workflow: any, callback?: string } }
export type BasicOptions = { subworkflows?: SubWorkflowConfigures, datas: any }
export type ExecutorFunctionBaseType<OptionsType = any, RequestType = any, ContextType = Context> = (context: ContextType, request: RequestType, options: OptionsType) => void
export type ExecutorFunction<ConfiguresType = any, RequestType = any> = ExecutorFunctionBaseType<ConfiguresType, RequestType, Context>
export type ProcessConfigureFunctionType<OptionsType = any> = (configure: { options: OptionsType }, workingReolver: ResolverParseContext) => SubWorkflowConfigures
export type WithGetSubworkflow = {
    processConfigure: ProcessConfigureFunctionType

}
export type MaybeWithProcessConfigure = Partial<WithGetSubworkflow>

export type WithEnter {
    enter: ()
}
