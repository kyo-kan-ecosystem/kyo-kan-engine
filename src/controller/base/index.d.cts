export type ContextInit = import("./context/index.cjs").ContextInit;
export class Registrater extends ContextBuilder {
    /**
     *
     * @param {ContextInit?} contextInit
     * @param {typeof Context?} contextClass
     */
    constructor(contextInit: ContextInit | null, contextClass: typeof Context | null);
    /**
     * @type {Context}
     */
    context: Context;
    registerExecutorPlugin(pluginName: any, plugin: any): void;
    registerWorkflowPlugin(pluginName: any, plugin: any): void;
    /**
     *
     * @param {import("../../engine/repositry/configure.cjs").EngineConfigure} values
     */
    setEngineConfigue(values: import("../../engine/repositry/configure.cjs").EngineConfigure): void;
    parseConfigures(configures: any): void;
}
export class Controller {
    /**
     *
     * @param {{executer?:any, workflow:any}} repositryData
     * @param {type Repositry} workflowRepositryClass
     * @param {type Repositry} pluginRepositryClass
     
     */
    constructor(repositryData: {
        executer?: any;
        workflow: any;
    }, workflowRepositryClass?: any, executerRepositryClass?: any);
    /**
     * @type {RepositryContext}
     */
    workflowRepositryContext: RepositryContext;
    executerRepositryContext: any;
    registerWorkflow(id: any, worklow: any): void;
    registerExecuter(id: any, executer: any): void;
    /**
     *
     * @param {any} request
     * @param {ControllerContext} context
     */
    exec(request: any, context: ControllerContext): void;
}
/**
 * @typedef {import("./context/index.cjs").ContextInit} ContextInit
 */
export class ContextBuilder {
    /**
     *
     * @param {typeof Context?} contextClass
     */
    constructor(contextClass: typeof Context | null);
    /**
     * @type {typeof Context}
     */
    _contextClass: typeof Context;
    /**
     * @param {ContextInit} args
     * @returns {Context}
     */
    _buildContext(contextInit: any): Context;
}
import { Context } from "./context/index.cjs";
