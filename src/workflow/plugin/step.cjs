


/**
 * @typedef {import("../protocol").ApplyResponse<number>} ApplyResponse
 * @typedef {import("../protocol").UnitConfigure<number>} UnitConfigure
 * @typedef {{steps:any[]}} WorkflowData
 */
class WorkflowPluginStep {
    /**
     * 
     * @param {any[]} configures
     * @param {import("../protocol").WorkflowContext} context 
     * @returns {ApplyResponse}  
     */
    applyConfigure(name, configures, context) {
        let indexKey = 0
        /**
         * @type {WorkflowData}
         */
        const workflowData = {
            steps: Array(configures.length)
        }
        const result = context.set(name, workflowData)
        /** 
        * @type {ApplyResponse}
        */
        const response = Object.assign(result, {

            configures: []
        })

        for (const configure of configures) {
            /**
             * @type {UnitConfigure}
             */
            const unitConfigure = {
                configure,
                data: indexKey
            }
            response.configures.push(unitConfigure)
            indexKey += 1
        }
        return response



    }
    /**
    * 
    * @param {number} data
    * @param {RepositryContext} context 
    *  
    */
    addWorkflowUnit(name, data, unitId, context) {
        /**
         * @type {WorkflowData}
         */
        const workflowData = context.get(name)
        workflowData.steps[data] = unitId
        context.set(name, workflowData)

    }
    resolve() {

    }
    exec() {

    }

}