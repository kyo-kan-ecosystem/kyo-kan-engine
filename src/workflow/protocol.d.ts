
export type { AbstractWorkflow as Plugin } from "./plugin/base_classes.cjs"

export type WorkflowPluginConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: any
}


export type SubworkflowDefinition {
    plugin: string,

}




