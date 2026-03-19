


export type WorkflowConfigureFormatBase = {
    plugin: string,
    id: string,

}

export type WorkflowStepPluginConfigure = {
    executors: Array<any>

} & WorkflowConfigureFormatBase

export type WorkflowSelectPluginConfigure = {
    executors: { [k in string]: any }
} & WorkflowConfigureFormatBase


export type WorflowConcurrentPluginCnfigure = {
    executors: { [k in string]: any }
} & WorkflowConfigureFormatBase

