import { PluginManager } from "../../../protocol/plugin/protocol"
import type { ScenarioPluginPack } from "./pluginpack.cjs"

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
export type PluginPackDefaultModuleType = {
    Pack: ScenarioPluginPack
}
export type PluginPackDefaultModuleNameType = keyof PluginPackDefaultModuleType