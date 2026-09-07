import type { EngineConfigure } from "../../src/engine/repositry/configure.cjs"
import type { WorkflowPluginConfigure } from "../workflow/protocol"


export type WorkflowPluginFormat = {
    [pluginId in string]: any
}
export type ExecutorPluginFormat = {
    [pluginId in string]: any
}
export type PluginFormat = {
    workflows?: WorkflowPluginFormat,
    executors?: ExecutorPluginFormat
}
export type SubWorkflowConfigureFormat = {

    datas: any

}
export type ExecutorConfigureFormat = {
    workflows: {
        [workflowName in string]: SubWorkflowConfigureFormat
    },
    data: any

}

export type ConfigureFormat<ScenarioType = any> = {
    engine?: EngineConfigure,
    scenario: ScenarioType,
    workflows?: {
        [workflowName in string]: any
    },
    executors?: {
        [k in string]: any
    }
}