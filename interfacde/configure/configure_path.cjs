
/**
 * 
 * @param {import("./protocol").WithConfigurePath} data 
 * @param {*} configures 
 */
function getConfigureFromPath(data, configures) {

    let result = configures[data.configurePath.root]
    const pathExpressions = data.configurePath.expressions
    for (const pathExpression of pathExpressions) {
        result = result[pathExpression]

    }
    return result

}
/** 
 * @template RootType
 * @param {RootType} root
 * @param {any[]|undefined} expressions
 * @returns {import("./protocol").ConfigurePath<RootType>}  
*/
function createConfigurePath(root, expressions = undefined) {
    return {
        root,
        expressions: expressions || []

    }

}
function createRootConfigurePath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'root'
    return createConfigurePath(root)
}
function createBootConfigurePath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'boot'
    return createConfigurePath(root)
}
function createWorkflowConfigurePath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'workflow'
    return createConfigurePath(root)
}
function createExecutorConfigurePath() {
    /**
     * @type {import("./protocol").DefaultRootType}
     */
    const root = 'executor'
    return createConfigurePath(root)
}
/**
 * 
 * @param {import("./protocol").ConfigurePath<any>} parent 
 * @param {any[]} expressions
 * @returns {import("./protocol").ConfigurePath<any>}
 */
function extendConfigurePath(parent, expressions) {
    return {
        root: parent.root,
        expressions: parent.expressions.concat(expressions)
    }


}

module.exports = {
    getConfigureFromPath,
    extendConfigurePath,
    createBootConfigurePath,
    createConfigurePath,
    createExecutorConfigurePath,
    createWorkflowConfigurePath,
    createRootConfigurePath
}