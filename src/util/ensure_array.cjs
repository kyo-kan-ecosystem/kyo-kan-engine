/**
 * @template ValueType
 * @param {ValueType | ValueType[]} value
 * @returns {ValueType[]}
 */
function ensureArray(value) {
    return Array.isArray(value) ? value : [value]
}
module.exports = { ensureArray }


