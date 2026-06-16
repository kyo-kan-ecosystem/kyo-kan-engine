
/**
 * @param {any} value
 */
function isVoid(value) {
    return typeof value === 'undefined' || value === null

}
const t = isVoid(null)
module.exports = { isVoid }