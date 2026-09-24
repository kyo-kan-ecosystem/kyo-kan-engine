export type WorkflowInterStep<workflowDatasType = any, executorConfigureType = any,> = {
    plugin: string;
    executorId?: string;
    executorConfigure?: executorConfigureType;
    workflowDatas?: workflowDatasType;
}