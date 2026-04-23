export type ExecutorConfigureFormatBaseType<ConfigureType = any> = {
    plugin: any,
    configure: ConfigureType
}

export type ExecutorConfigureFormatType<ConfigureType = any, SubWorkflowsType = any, HooksType = any> = ExecutorConfigureFormatBaseType<ConfigureType> & {

    subWorkflows?: SubWorkflowsType
    hooks?: any
} 