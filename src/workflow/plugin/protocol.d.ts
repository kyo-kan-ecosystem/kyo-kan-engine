import { Context } from "../../states/protocol"

/**
 * Confingure which call on the flay configure
 
 */

export type WorkflowConfigureFormatBase<ExecutorsType = any, DatasType = any> = {
    plugin: string;
    executors: ExecutorsType;
    datas?: DatasType;
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






