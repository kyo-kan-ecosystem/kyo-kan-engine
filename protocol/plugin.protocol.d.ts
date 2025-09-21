export type SubworkflowDefinition = {
    plugin: string,
    hooks?: any


}
export type PluginConfigure = {
    params: any,
    plugin: any
    subworkflows: { [k in any]: any }
}