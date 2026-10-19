import { WithConfigurePath } from "../../interfacade/configure/protocol"
import type { Regrator } from "../../interfacade/portabledata/registrator.cjs"


export type DefaultTag = 'remote_fetch' | 'local_access' | 'data_access' | 'eval_fix' | 'eval_flex'
export type KyoKanExtendedType = 'executor' | 'workflow' | 'both'
export type MCPStyleMeta = {
    type: string,
    description: string,
    items?: MCPStyleMeta,
    properties?: { [k in string]: MCPStyleMeta },
    defaults?: { [k in string]: any } | any[],
    required?: string[] | boolean,
    extendProperty: boolean | MCPStyleMeta

}
expport type PluginMeta<OptionsType extends MCPStyleMeta> = { name: string, description: string, tag?: string[] }
export type PluginModule<MetaType = MCPStyleMeta, BuildResultType = any> = {
    meta: () => MetaType,
    manger: Registrator,
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