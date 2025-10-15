
export type { BaseWorkflow as Plugin } from "./plugin/base_class.cjs"

export type WorkflowPluginConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: any
}


export type SubworkflowDefinition {
    plugin: string,

}




