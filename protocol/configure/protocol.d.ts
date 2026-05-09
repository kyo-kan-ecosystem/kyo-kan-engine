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

    params: any

}
export type ExecutorConfigureFormat = {
    workflows: {
        [workflowName in string]: SubWorkflowConfigureFormat
    },
    data: any

}

export type ConfigureFormat = {
    engine?: EngineConfigure,
    root: any
    workflows?: {
        [workflowName in string]: any
    },
    executors?: {
        [k in string]: any
    }
}