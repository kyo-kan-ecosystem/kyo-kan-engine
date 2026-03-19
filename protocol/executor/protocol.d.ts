
export type ExecutorConfigure<ParamsType = any> = {
    params: ParamsType,
    plugin: string
    subworkflows?: { [k in any]: any }
    enterFunction?: string
}

