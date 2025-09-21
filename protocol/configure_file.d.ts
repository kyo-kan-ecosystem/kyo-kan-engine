import { EngineConfigure } from "../src/engine/repositry/configure.cjs"


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
    engine?: EngineConfigure
    plugins?: any
}