import type { ResolverParseContext } from "../../src/resolver/interfacade/parse_context.cjs"

import { Context } from "../context/protocol"

export * from '../../src/executor/protocol'

export type SubWorkflowConfigures = { [k in string]: { workflow: any, callback?: string } }
export type OptionsWithSubworkflow = { subworkflows?: SubWorkflowConfigures, datas: any }
export type ExecutorFunctionBaseType<OptionsType = any, RequestType = any, ContextType = Context> = (context: ContextType, request: RequestType, options: OptionsType) => void
export type ExecutorFunction<ConfiguresType = any, RequestType = any> = ExecutorFunctionBaseType<ConfiguresType, RequestType, Context>
export type ProcessConfigureFunctionType<OptionsType = any> = (configure: { options: OptionsType }, workingResolver: ResolverParseContext) => SubWorkflowConfigures
export type WithProcessConfigure = {
    processConfigure: ProcessConfigureFunctionType

}
export type MaybeWithProcessConfigure = Partial<WithProcessConfigure>

export type WithEnter {
    enter: ExecutorFunctionBaseType
}





