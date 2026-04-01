


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


export type WorkflowResponse = {
    context: any,
    executor: any
} | false

export type WorkflowResponses = WorkflowResponse[]


