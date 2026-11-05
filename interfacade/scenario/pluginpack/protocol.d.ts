import { PluginManager } from "../../../protocol/plugin/protocol"

export type PluginPackagePathLinkType = {
    modulePath: string;
    moduleName?: string | undefined;
}

export type PluginPackageDirectType = {
    manager: PluginManager
}



export type PluginPackageDataTypes = {
    [id in string]: PluginPackagePathLinkType | PluginPackageDirectType

}
