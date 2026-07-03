class Registrater {
    /**
     * @type {number}
     */
    _count
    /**
     * @param {number} [count=-1]
     */
    constructor(count = -1) {
        this._count = count
    }
    _generateId() {
        return ++this._count

    }

}

module.exports = { Registrater }