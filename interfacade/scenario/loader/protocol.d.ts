import { Context } from "../../../protocol/index.protocol";
export type PluginsRespone = {
    workflows: any,
    executors: any
}

export interface ScenarioLoaderInterFace {
    loadContext(id) => Promise<Context.Class>
    loadPlugins(id) => Promise<PluginsRespone>


}