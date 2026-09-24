import { WithConfigurePath } from "../../interfacade/configure/protocol"
import type { ExecutorsContext } from "./context.cjs"
import { PluginConfigureReadableProtocolBase, PluginConfigureProtocol } from "../../protocol/plugin/protocol"


type ExecutorConfiguresExtend<SubworkflowsType = any> = {
    subworkflows?: SubworkflowsType
}


export type ExecutorConfigureReadable<OptionsType = any, SubworkflowsType = any> = PluginConfigureReadableProtocolBase<OptionsType, ExecutorConfiguresExtend<SubworkflowsType>>
export type SubworkflowMapType = { [k in string | number]: { workflow: any, callbackc: string } }
export type ExecutorConfigureProtocol<OptionsType = any> = PluginConfigureProtocol<OptionsType, ExecutorConfiguresExtend<SubworkflowMapType>>


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
