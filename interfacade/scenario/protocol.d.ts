

export type ScenarioPluginPackUrlFormat = {
    url: string;
    packageModuleName?: string | undefined
}
export type ScenarioJsonFormat = {
    root: any;
    workflows?: any;
    executors?: any;
    boots?: Array<any>;
    pluginPacks: ScenarioPluginPackUrlFormat[]



}