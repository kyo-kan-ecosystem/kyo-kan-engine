import { EngineConfigure } from "./engine/repositry/configure.cjs"


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
export type WorkflowConfigureFormat = {
    plugin: string,
    data: any

}
export type ExecutorConfigureFormat = {
    workflows: {
        [workflowName in string]: WorkflowConfigureFormat
    },
    data: any

}

export type ConfigureFormat = {
    engine?: EngineConfigure
    plugins?: any
}