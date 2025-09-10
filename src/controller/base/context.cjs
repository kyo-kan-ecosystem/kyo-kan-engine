const { ExecutorPluginRepositry } = require("../../executor/repositry/plugin.cjs");
const { ExecutorWorknodeRepositry } = require("../../executor/repositry/worknode.cjs");

const { WorkflowPluginRepositry } = require("../../workflow/repositry/plugin.cjs");
const { WorkflowRepositry } = require("../../workflow/repositry/workflow.cjs");
/**
 * @typedef {{
 *      workflows: typeof WorkflowRepositry,
 *      worknodes: typeof ExecutorWorknodeRepositry,
 *      plugins: {
 *           workflows: typeof WorkflowPluginRepositry,
 *           executors: typeof ExecutorPluginRepositry
 *      }} } RepositryClasses
    
 * 
 */
/**
 * @type {RepositryClasses}
 */
const DEFAULT_REPOSITRY_CLASSES = {
    workflows: WorkflowRepositry,
    worknodes: ExecutorWorknodeRepositry,
    plugins: {
        workflows: WorkflowPluginRepositry,
        executors: ExecutorPluginRepositry
    }


}

/**
 * @typedef {{workflows:any, worknodes:any, plugins?:{workflows:WorkflowPluginRepositry, executors:ExecutorPluginRepositry}}} BasicData
 */
class BasicFunctionContext {
    /**
     * @param {BasicData} [initData={}] 
     * @param {RepositryClasses} repositryClasses 
     */
    constructor(initData = {}, repositryClasses = DEFAULT_REPOSITRY_CLASSES) {
        /**
         * @type {WorkflowRepositry}
         */
        this.workflows = new repositryClasses.workflows(initData.workflows || {})
        /**
         * @type {ExecutorWorknodeRepositry}
         */
        this.worknodes = new repositryClasses.worknodes(initData.worknodes || {})
        /**
         * @type {{
         *  workflows: WorkflowPluginRepositry,
         *  executors: ExecutorPluginRepositry
         * 
         * }}
         */
        this.plugins = {}
        if (initData.plugins) {
            this.plugins = initData.plugins


        }
        else {
            this.plugins.workflows = new repositryClasses.plugins.workflows({})
            this.plugins.executors = new repositryClasses.plugins.executors({})
        }



    }
    /**
     * 
     * @returns {{workflows:any, executors:any}}
     */
    getPluginMap() {
        /**
         * @type {workflows:any, executors:any}
         */
        return { workflows: this.plugins.workflows.getSerializeDatas(), executors: this.plugins.executors.getSerializeDatas }
    }
    getWorkflowConfigure() {
        return { workflows: this.workflows.getSerializeDatas(), worknodes: this.worknodes.getSerializeDatas() }
    }
    setCalleId(calleId) {
        this.workflows.calleId = calleId

    }
    clone() {
        /**
         * @typedef {keyof BasicFunctionContext} _keys
         * 
         */
        const cloneKey = 'workflows';
        const ret = {}
        for (const key in this) {
            if (cloneKey == key) {
                const element = this[key]
                ret[key] = element.clone()

            }
            else {
                ret[key] = this[key]
            }

        }
        return ret

    }




}