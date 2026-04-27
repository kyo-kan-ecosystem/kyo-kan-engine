import { Context } from "../../controller/protocol"

/**
 * Confingure which call on the flay configure
 
 */

export type WorkflowConfigureFormatBase<ExecutorsType = any, ParamsType = any> = {
    plugin: string;
    executors: ExecutorsType;
    params?: ParamsType;
}

/**
 * Confingure which Call Registered Workflow
 * 
 */
export type WorkflowConfigureFormatIdType<ParamsType = any> = {
    id: string
    params?: ParamsType


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
    callback?: any
}

export type WorkflowSteps<ContextType = Context<any, any>> = WorkflowStep<ContextType>[]

export type MaybeWorkflowSteps = WorkflowSteps | WorkflowStep






