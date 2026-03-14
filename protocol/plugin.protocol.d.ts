export type SubworkflowDefinition = {
    plugin: string,
    hooks?: any


}
export type PluginConfigure = {
    params: any,
    plugin: any
    subworkflows: { [k in any]: any }
}

export type AbstractPlugin = {
    [k in string]: (request: any, context) => any

}