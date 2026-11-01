export type WorkflowInterStep<workflowDatasType = any, executorConfigureType = any,> = {
    plugin: string;
    executorId?: string;
    executorConfigure?: executorConfigureType;
    workflowDatas?: workflowDatasType;
}

export type ScenarioPluginPackUrlFormat = {
    url: string;
    packageModuleName?: string | undefined
}
export type ScenarioJsonFormat = {
    root: any;
    workflows: any;
    executors: any;
    boots: Array<any>



}