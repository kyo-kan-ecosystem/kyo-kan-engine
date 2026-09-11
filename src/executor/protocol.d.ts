import { WithConfigurePath } from "../../interfacde/configure/protocol"

import type { ExecutorsContext } from "./context.cjs"

export type ExecutorConfigureFormatBaseType<OptionsType = any> = PluginConfigureBaseProtocol {
    plugin: any,
        options ?: OptionsType


}

export type ExecutorConfigureReadableFormatType<OptionsType = any> = ExecutorConfigureFormatBaseType {
    subworkflows ?: any
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
    subworkflowMap?: { [name in any]: any }
} & WithConfigurePath

export type ExecutorConfigures = {
    boots?: any,
    plugins?: any
}

export type ExecutorsContextInit = ConstructorParameters<typeof ExecutorsContext>[0]
