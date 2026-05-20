export type ExecutorConfigureFormatBaseType<OptionsType = any> = {
    plugin: any,
    options: OptionsType

}

export type SubworkflowsConfigureOuterSettingFormat = {
    workflow: any,
    callback?: string
}

export type SubworkflowsConfigureInnerSettingFormat<ConfigureType = any> = {
    plugin: any,
    configure: any,
    callback?: string

}

export type SubworkflowsConfigureFormat<ConfigureType = any> = {
    [name in any]: SubworflowsOuterSettingFormat | SubworkflowsConfigureInnerSettingFormat<ConfigureType>
}

export type ExecutorConfigureFormatType<ConfigureType = any> = ExecutorConfigureFormatBaseType<ConfigureType> & {

    subWorkflows?: SubworkflowsConfigureFormat,
    subworkflowMap?: { [name in any]: any }
}

export type ExecutorConfigures = {
    boots?: any,
    plugins?: any
}


