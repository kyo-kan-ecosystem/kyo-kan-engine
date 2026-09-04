export type WorkflowInterStep<executorConfigureType = any, workflowParamsType = any> = {
    plugin: string;
    id?: string;
    executorConfigure?: executorConfigureType;
    workflowParams?: workflowParamsType;
}