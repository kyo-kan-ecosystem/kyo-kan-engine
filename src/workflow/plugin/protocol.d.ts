import { PluginConfigureProtocol, PluginConfigureReadableProtocolBase } from "../../../protocol/plugin/protocol"
import { Context } from "../../states/protocol"


export type WorkflowConfigureExtend<ExecutorsType = any> = {

    executors: ExecutorsType
}



export type WorkflowPluginConfigureReadable<ExecutorsType = any, OptionsType = any> = PluginConfigureReadableProtocolBase<OptionsType, WorkflowConfigureExtend<ExecutorsType>>
export type WorkflowConfigure<ExecutorsType = any, OptionsType = any> = PluginConfigureProtocol<OptionsType, WorkflowConfigureExtend<ExecutorsType>>




export type WorkflowConfigureFormatBase<ExecutorsType = any, OptionsType = any> = {
    plugin: string;
    executors: ExecutorsType;
    options?: OptionsType;
}

/**
 * Confingure which Call Registered Workflow
 * 
 */
export type WorkflowConfigureFormatIdType<DatasType = any> = {
    id: string
    datas?: DatasType


}


export type WorkflowConfigureFormatUnion = WorkflowConfigureFormatBase | WorkflowConfigureFormatIdType



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




