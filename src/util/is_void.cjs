
/**
 * @param {any} value
 */
function isVoid(value) {
    return typeof value === 'undefined' || value === null

}
/**
 * 
 * @param {*} value 
 * @param {*} defaultValue 
 * @returns 
 */
function dynamicDefault(value, defaultValue) {
    return isVoid(value) === true ? defaultValue : value
}
module.exports = { isVoid, dynamicDefault }