import { PluginConfigureProtocol, PluginConfigureReadableProtocolBase } from "../../../protocol/plugin/protocol"
import { Context } from "../../states/protocol"


export type WorkflowConfigureExtend<ExecutorIDsType = any> = {

    executorIDs: ExecutorIDsType
}



export type WorkflowPluginConfigureReadable<ExecutorsType = any, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowConfigureExtend<ExecutorsType>>
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



