
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
/**
 * 
 * @param {any} value
 * @param {new (arg0: any) => any} errorClass
 * @param {any} messageData 
 */
function assertIsNotVoid(value, errorClass, messageData = undefined) {
    if (isVoid(value) === true) {
        if (isVoid(messageData) === true) {
            throw new errorClass(value)
        }
        throw new errorClass(messageData)
    }
}

module.exports = { isVoid, dynamicDefault, assertIsNotVoid }