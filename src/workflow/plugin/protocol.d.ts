


export type WorkflowConfigureFormatBase = {
    plugin: string,
    id: string,

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


export type WorkflowStep = {
    context: any,
    executor: any,
    callback?: any,
}

export type WorkflowSteps = WorkflowStep[]

export type MaybeWorkflowSteps = WorkflowSteps | WorkflowStep






