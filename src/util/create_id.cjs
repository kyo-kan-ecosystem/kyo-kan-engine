
const DELIMITER = ':'

/**
 * @param {string} callerId
 * @param {string} name
 */
function createId(callerId, name) {
    return callerId + DELIMITER + name
}

module.exports = {
    createId
}