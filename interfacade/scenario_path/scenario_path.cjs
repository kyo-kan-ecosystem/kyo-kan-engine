
/**
 * 
 * @param {import("./protocol").WithScenarioPath} data 
 * @param {*} configures 
 */
function getConfigureFromPath(data, configures) {

    let result = configures[data.scenarioPath.root]
    const pathExpressions = data.scenarioPath.expressions
    for (const pathExpression of pathExpressions) {
        result = result[pathExpression]

    }
    return result

}
/** 
 * @template RootType
 * @param {RootType} root
 * @param {any[]|undefined} expressions
 * @returns {import("./protocol").ScenarioPath<RootType>}  
*/
function createScenarioPath(root, expressions = undefined) {
    return {
        root,
        expressions: expressions || []

    }

}
function createRootScenarioPath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'root'
    return createScenarioPath(root)
}
function createBootScenarioPath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'boots'
    return createScenarioPath(root)
}
function createWorkflowScenarioPath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'workflows'
    return createScenarioPath(root)
}
function createExecutorScenarioPath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'executors'
    return createScenarioPath(root)
}
/**
 * 
 * @param {import("./protocol").ScenarioPath<any>} parent 
 * @param {any[]} expressions
 * @returns {import("./protocol").ScenarioPath<any>}
 */
function extendScenarioPath(parent, expressions) {
    return {
        root: parent.root,
        expressions: parent.expressions.concat(expressions)
    }


}

module.exports = {
    getConfigureFromPath,
    extendScenarioPath,
    createBootScenarioPath,
    createScenarioPath,
    createExecutorScenarioPath,
    createWorkflowScenarioPath,
    createRootScenarioPath
}