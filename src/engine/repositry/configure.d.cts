export type EngineConfigure = {
    root: {
        workflow: {
            plugin: string;
            id: string;
        };
    };
};
export class EngineConfigureRepositry extends Repositry {
    constructor(datas?: EngineConfigure);
}
/**
 * @typedef {{root:{workflow:{plugin:string, id:string}}}} EngineConfigure
 */
/**
 * @type {EngineConfigure}
 */
export const DEFAULT_ENGINE_CONFIGURE: EngineConfigure;
import { Repositry } from "../../repositry/base.cjs";
