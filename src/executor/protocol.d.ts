export type ExecutorConfigureFormatBaseType<ConfigureType = any> = {
    plugin: any,
    configure: ConfigureType

}

export type SubworflowsConfigureOuterSettingFormat = {
    workflow: any,
    callback?: string
}

export type SubworflowsConfigureInnerSettingFormat<ConfigureType = any> = {
    plugin: any,
    configure: any,
    callback?: string

}

export type SubworflowsConfigureFormat<ConfigureType = any> = {
    [name in any]: SubworflowsOuterSettingFormat | SubworflowsConfigureInnerSettingFormat<ConfigureType>
}

export type ExecutorConfigureFormatType<ConfigureType = any> = ExecutorConfigureFormatBaseType<ConfigureType> & {

    subWorkflows?: SubworflowsConfigureFormat,
    subworkflowMap?: { [name in any]: any }
} 