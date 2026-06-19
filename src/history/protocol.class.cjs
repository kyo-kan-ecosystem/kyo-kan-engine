class StepIsOverFlowError extends Error {
    /**
     * 
     * @param {*} branchId 
     * @param {*} step 
     */
    constructor(branchId, step) {
        super(`${branchId} overflow by step ${step}`)
    }
}
module.exports = { StepIsOverFlowError }

