import { Context } from "../../../protocol/index.protocol"
import type { Scenario } from "../scenario.cjs"
export type PluginsRespone = {
    isExist: boolean,
    workflows?: any,
    executors?: any
}
export type ContextLoadResult = {
    isExist: boolean,
    context: Context.Class
}
export type ScenarioID = {
    nameSpace: string,
    id: string
}

export type ScenarioLoadResult = {
    isExist: boolean,
    scenario: Scenario
}
export interface ScenarioLoaderInterFace {
    loadContext(ScenarioID) => Promise<ContextLoadResult>
    loadPlugins(ScenarioID) => Promise<PluginsRespone>
    loadScenario(ScenarioID) => Promise<>


}