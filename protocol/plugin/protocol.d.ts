import { WithConfigurePath } from "../../interfacde/configure/protocol"

export type MCPStyleMeta = { type: string, description: string, items?: MCPStyleMeta, prefixItems }
export type PluginModule<MetaType = any, EditDataType = any, CreateDataType = any, BuildResultType = any> = {
    meta: () => BuildResultType,
    update: () => UpdateDataType,
    create: () => CreateDataType,
    biuld: () => BuildResultType
}
export type PluginConfigureBase<OptionsType = any, ExtendType = any> = {
    plugin: any,
    options?: OptionsType
} & ExtendType

export type PluginConfigureLink = { id: any }


export type PluginConfigureReadableProtocolBase<OptionsType = any, ExtendType = {}> = PluginConfigureBase<OptionsType, ExtendType> | PluginConfigureLink

export type PluginConfigureProtocol<OptionsType = any, ExtendType = any> = PluginConfigureBase<OptionsType, ExtendType> & WithConfigurePath