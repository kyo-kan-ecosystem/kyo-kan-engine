class CountId {
    _count
    constructor() {
        this._count = -1
    }
    generate() {
        this._count++
        return this._count
    }
}

module.exports = { CountId }