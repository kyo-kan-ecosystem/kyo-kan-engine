export type ExecutorConfigureFormatBaseType<ConfigureType = any> = {
    plugin: any,
    configure: ConfigureType
}

export type ExecutorConfigureFormatType<ConfigureType = any> = ExecutorConfigureFormatBaseType<ConfigureType> & {

    subWorkflows: {
        [name in any]: {
            id: any,
            callback?: any
        }
    }
} 