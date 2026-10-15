import { WithConfigurePath } from "../../interfacade/configure/protocol"

export type DefaultTag = 'remote access' | 'local access' | 'data access'
export type KyoKanExtendedType = 'executor' | 'workflow' | 'both'
export type MCPStyleMeta = { type: string, description: string, items?: MCPStyleMeta, properties: { [k in any:]: MCPStyleMeta }, default?: any, required: string[], keep }
expport type PluginMeta<> = { name: string, description: string, tag?:}
export type PluginModule<MetaType = MCPStyleMeta, BuildResultType = any> = {
    meta: () => MetaType,
    build: () => BuildResultType
}
export type PluginConfigureBase<OptionsType = any, ExtendType = any> = {
    plugin: any,
    options?: OptionsType
} & ExtendType

export type PluginConfigureLink = { id: any }

export type PluginConfigureReadablInPlaceProtocol<OptionsType = any, ExtendType = {}> = PluginConfigureBase<OptionsType, ExtendType>
export type PluginConfigureReadableProtocolBase<OptionsType = any, ExtendType = {}> = PluginConfigureReadablInPlaceProtocol<OptionsType, ExtendType> | PluginConfigureLink

export type PluginConfigureProtocol<OptionsType = any, ExtendType = any> = PluginConfigureBase<OptionsType, ExtendType> & WithConfigurePath