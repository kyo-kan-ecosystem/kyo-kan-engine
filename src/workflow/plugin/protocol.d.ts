import { PluginConfigureProtocol, PluginConfigureReadableProtocolBase } from "../../../protocol/plugin/protocol"
import { Context } from "../../states/protocol"


export type WorkflowConfigureExtend<ExecutorsType = any> = {

    executors: ExecutorsType
}



export type WorkflowPluginConfigureReadable<ExecutorsType = any, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowConfigureExtend<ExecutorsType>>
export type WorkflowConfigure<ExecutorsType = any, OptionsType = any> = PluginConfigureProtocol<OptionsType, WorkflowConfigureExtend<ExecutorsType>>



export type WorkflowMemberExecutorData<MemberDataType = any> = { memberData?: MemberDataType, executorConfig: any, configurePath: any[] }
export type WorkflowMemberExecutorDatas<ExecutorDataType = any> = WorkflowMemberExecutorData<ExecutorDataType>[]
export type WorkflowGetMemberExecutorResult<ExecutorsType = any, ExecutorDataType = any> = {
    members: WorkflowMemberExecutorDatas<ExecutorDataType>,
    executors: ExecutorsType
}

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




