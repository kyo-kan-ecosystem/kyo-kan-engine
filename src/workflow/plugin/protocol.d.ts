import { PluginConfigureProtocol, PluginConfigureReadableProtocolBase } from "../../../protocol/plugin/protocol"
import type { ResolverParseContext } from "../../resolver/exports.cjs"
import type { Context } from "../../states/protocol"


export type WorkflowReadablConfigureExtend<FlowDatasType = {}> = {
    flowDatas: FlowDatasType
}

export type WorkflowConfigureExtend<FlowDatasType = any> = {

    flowDatas: FlowDatasType
}

export type WorkflowConfigureInPlace<FlowDatasType, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowReadablConfigureExtend<FlowDatasType>>



export type WorkflowPluginConfigureReadable<FlowDatasType = any, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowReadablConfigureExtend<FlowDatasType>>
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

export type WorflowControllFunction<FlowDatasType = {}, OptionsType = any, RequestType = any, ContextType = Context<any, any>> = (context: ContextType, configure: WorkflowConfigure<FlowDatasType, OptionsType> request: RequestType) => MaybeWorkflowSteps
export type WorkflowGetFlowDatasFunction<FlowDatasType = any, FlowDatasType = any> = (configure: WorkflowConfigureInPlace, resolver: ResolverParseContext) => FlowDatasType // protocol example


