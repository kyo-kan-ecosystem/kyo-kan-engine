export type PluginPackageConfigureType = {
    modulePath: string;
    moduleName?: string | undefined;
}

export type PluginPackageConfigureTypes = {
    [id in string]: PluginPackageConfigureType

}