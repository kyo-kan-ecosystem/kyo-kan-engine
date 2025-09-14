import { Stack } from "../../../../util/stack.cjs";

class BordBranch extends Stack {
    getSerializedData() {
        return { items: this._items }
    }
}
module.exports = { BordBranch }