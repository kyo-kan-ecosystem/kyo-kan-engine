export type ExecutorConfigureFormatType<ConfigureType = any, SubWorkflowsType = any, HooksType = any> = {
    plugin: any,
    configure: ConfigureType,
    subWorkflows?: SubWorkflowsType
    hooks?: any
} 