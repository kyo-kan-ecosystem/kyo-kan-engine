import { WithConfigurePath } from "../../interfacade/configure/protocol"
import type { Regrator } from "../../interfacade/portabledata/registrator.cjs"
import { JSONSchema4 } from "@types/json-schema"

export type DefaultTag = 'remote_fetch' | 'local_access' | 'data_access' | 'eval_fix' | 'eval_flex'
export type WorkflowRef = 'kyo-kan:workflow'
export type ExecutorRef = 'kyo-kan:executor'
export type HybridRef = 'kyo-kan:hybrid'
export type KyoKanExtendedType = 'executor' | 'workflow' | 'both'
export type PluginMeta = { name: string, description: string, hint?: string, tag?: string[], options: JSONSchema4 }
export type PluginManager<MetaType =, BuildResultType = any> = {
    meta: () => MetaType,
    editor: Registrator,
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