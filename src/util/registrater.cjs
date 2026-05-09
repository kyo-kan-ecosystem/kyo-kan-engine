class Registrater {
    /**
     * @type {number}
     */
    _count
    constructor() {
        this._count = -1
    }
    _generateId() {
        return ++this._count

    }

}

module.exports = { Registrater }