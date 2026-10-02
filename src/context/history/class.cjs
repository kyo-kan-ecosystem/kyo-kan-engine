const { MapedHistory } = require("../../history/maped_history.cjs");

/**
 * @extends {MapedHistory<number>}
 */
class ContextHistory extends MapedHistory {
    /**
     * @type {import("../index.cjs").Context}
     */
    // @ts-ignore
    _context

    /**
     * @param {import("../index.cjs").Context} context
     */
    setContext(context) {
        this._context = context
    }
    forward() {
        super.forward(this._context.getBranchId(), 0)
    }

}

module.exports = { ContextHistory }