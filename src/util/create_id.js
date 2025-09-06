
const DELIMITER = ':'

function create_id(callerId, name) {
    return callerId + DELIMITER + name
}

module.exports = {
    create_id
}