export type SubworkflowDefinition = {
    plugin: string,
    hooks?: any


}
export type ExecutorConfigure = {
    params: any,
    plugin: any
    subworkflows: { [k in any]: any }
}

