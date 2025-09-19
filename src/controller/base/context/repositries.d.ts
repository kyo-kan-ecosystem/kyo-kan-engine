export type ContextRepositryConfigureInits = {
    workflows?: any;
    executors?: any;
    engine?: any;
};
export type ContextRepositryConfigures = {
    workflows: WorkflowConfiguresRepositry;
    execteNodes: ExecutorConfigureRepositry;
    engine: EngineConfigureRepositry;
};
export type ContextRepositryPlugins = {
    workflows: WorkflowPluginRepositry;
    executors: ExecutorPluginRepositry;
};
export type ContextRepositryClasses = {
    configures: {
        workflows: typeof WorkflowConfiguresRepositry;
        executors: typeof ExecutorConfigureRepositry;
        engine: typeof EngineConfigureRepositry;
    };
    plugins: {
        workflows: typeof WorkflowPluginRepositry;
        executors: typeof ExecutorPluginRepositry;
    };
};
export type ContextRepositryArgs = {
    configures?: ContextRepositryConfigureInits;
    plugins?: ContextRepositryPlugins;
    classes?: ContextRepositryClasses;
};
/**
 * @typedef {{
 *          configures?:ContextRepositryConfigureInits,
 *          plugins?:ContextRepositryPlugins,
 *          classes?:ContextRepositryClasses
 * }} ContextRepositryArgs
 */
export class Repositries {
    /**
     *
     * @param {ContextRepositryArgs} args
     */
    constructor(args: ContextRepositryArgs);
    /**
     * @type {ContextRepositryConfigures}
     */
    configures: ContextRepositryConfigures;
    /**
     * @type {ContextRepositryPlugins}
     */
    plugins: ContextRepositryPlugins;
    getPluginRepositry(): ContextRepositryPlugins;
    getConfiguresAsSerializeDatas(): {};
}
import { WorkflowConfiguresRepositry } from "../../../workflow/repositry/configures.cjs";
import { ExecutorConfigureRepositry } from "../../../executor/repositry/configure.cjs";
import { EngineConfigureRepositry } from "../../../engine/repositry/configure.cjs";
import { WorkflowPluginRepositry } from "../../../workflow/repositry/plugins.cjs";
import { ExecutorPluginRepositry } from "../../../executor/repositry/plugin.cjs";
