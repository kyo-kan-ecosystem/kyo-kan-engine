
export type MCPStyleMeta = { type: string, description: string, items?: MCPStyleMeta, prefixItems }
export type PluginModule<MetaType = any, EditDataType = any, CreateDataType = any, BuildResultType = any> = {
    meta: () => BuildResultType,
    update: () => UpdateDataType,
    create: () => CreateDataType,
    biuld: () => BuildResultType
}
export type PluginConfigureOnTheSpot<OptionsType = any> = {
    plugin: any,
    options?: OptionsType
}
export type PluginConfigureBaseProtocol<OptionsType = any, ExtendType = {}> = (PluginConfigureOnTheSpot<OptionsType> & ExtendType) | {
    id: any
}

