import { WithConfigurePath } from "../../interfacde/configure/protocol"
import type { ExecutorsContext } from "./context.cjs"
import { PluginConfigureReadableProtocolBase, PluginConfigureProtocol } from "../../protocol/plugin/protocol"
export * from './'

type ExecutorConfiguresExtend<SubworkflowsType = any> = {
    subworkflows?: SubworkflowsType
}


export type ExecutorConfigureReadable<OptionsType = any, SubworkflowsType = any> = PluginConfigureReadableProtocolBase<OptionsType, ExecutorConfiguresExtend<SubworkflowsType>>
export type SubworkflowMapType = { [k in string | number]: string | number }
export type ExecutorConfigureProtocol<OptionsType = any> = PluginConfigureProtocol<OptionsType, Required(ExecutorConfiguresExtend<SubworkflowMapType>) >


export type SubworkflowsConfigureInnerSettingFormat<ConfigureType = any> = {
    plugin: any,
    configure: any,
    callback?: string

}

export type SubworkflowsConfigureFormat<ConfigureType = any> = {
    [name in any]: SubworflowsOuterSettingFormat | SubworkflowsConfigureInnerSettingFormat<ConfigureType>
}



export type ExecutorConfigures = {
    boots?: any,
    plugins?: any
}

export type ExecutorsContextInit = ConstructorParameters<typeof ExecutorsContext>[0]
