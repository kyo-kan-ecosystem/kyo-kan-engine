
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

module.exports = { getConfigureFromPath }