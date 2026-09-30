import { PluginConfigureProtocol, PluginConfigureReadableProtocolBase } from "../../../protocol/plugin/protocol"
import type { ResolverParseContext } from "../../resolver/exports.cjs"
import type { Context } from "../../states/protocol"


export type WorkflowReadablConfigureExtend<ExecutorsType = {}> = {
    executors: ExecutorsType
}

export type WorkflowConfigureExtend<ExecutorIDsType = any> = {

    executorIDs: ExecutorIDsType
}

export type WorkflowConfigureInPlace<ExecutorsType = PluginConfigureReadableProtocolBase<{}, WorkflowReadablConfigureExtend<ExecutorsType>>



export type WorkflowPluginConfigureReadable<ExecutorsType = any, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowReadablConfigureExtend<ExecutorsType>>
export type WorkflowConfigure<ExecutorIdsType = any, OptionsType = any> = PluginConfigureProtocol<OptionsType, WorkflowConfigureExtend<ExecutorIdsType>>



export type WorkflowMemberExecutorData = { id: any, executorConfig: any, configurePath: any[] }
export type WorkflowMemberExecutorDatas = WorkflowMemberExecutorData[]


export type WorkflowStepPluginConfigure = {
    executors: Array<any>

}

export type WorkflowSelectPluginConfigure = {
    executors: { [k in string]: any }
}


export type WorflowConcurrentPluginCnfigure = {
    executors: { [k in string]: any }
}


export type WorkflowStep<ContextType = Context<any, any>> = {
    context: ContextType,
    executor?: any,

}

export type WorkflowSteps<ContextType = Context<any, any>> = WorkflowStep<ContextType>[]
export type MaybeWorkflowSteps = WorkflowSteps | WorkflowStep

export type WorflowControllFunction<ExecutorsType = {}, OptionsType = any, RequestType = any, ContextType = Context<any, any>> = (context: ContextType, configure: WorkflowConfigure<ExecutorsType, OptionsType> request: RequestType) => MaybeWorkflowSteps
export type WorkflowGetMemberExecutorsFunction<ExecutorsType = any, ExecutorIDsType = any> = (configure: WorkflowConfigureInPlace, resolver: ResolverParseContext) => ExecutorIDsType // protocol example


