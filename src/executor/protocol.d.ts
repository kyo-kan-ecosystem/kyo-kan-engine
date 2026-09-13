import { WithConfigurePath } from "../../interfacde/configure/protocol"
import type { ExecutorsContext } from "./context.cjs"
import { PluginConfigureBaseProtocol } from "../../protocol/plugin/protocol"


type ExecutorConfiguresExtend<SubworkflowsType> = {
    subworkflows?: SubworkflowsType
}


export type ExecutorConfigureReadable<OptionsType = any, SubworkflowsType = any> = PluginConfigureBaseProtocol<OptionsType, ExecutorConfiguresExtend<SubworkflowsType>>
export type SubworkflowMapType = Object<string | number, string | number>
export type ExecutorConfigureFormatType<OptionsType = any> = PluginConfigureBaseProtocol<OptionsType, ExecutorConfiguresExtend<SubworkflowsMapType>> & WithConfigurePath



export type SubworkflowsConfigureInnerSettingFormat<ConfigureType = any> = {
    plugin: any,
    configure: any,
    callback?: string

}

export type SubworkflowsConfigureFormat<ConfigureType = any> = {
    [name in any]: SubworflowsOuterSettingFormat | SubworkflowsConfigureInnerSettingFormat<ConfigureType>
}
*/


export type ExecutorConfigures = {
    boots?: any,
    plugins?: any
}

export type ExecutorsContextInit = ConstructorParameters<typeof ExecutorsContext>[0]
