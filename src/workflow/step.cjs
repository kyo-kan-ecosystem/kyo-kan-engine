const { RepositryContext } = require("../repositry/base.cjs")


/**
 * @typedef {import("./protocol").ApplyResponse} ApplyResponse
 * @typedef {import("./protocol").UnitConfigure} UnitConfigure
 * @typedef {{steps:str[]}} WorkflowData
 */
class WorkflowStep {
    /**
     * 
     * @param {any[]} configures
     * @param {RepositryContext} context 
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
    * @param {int} data
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