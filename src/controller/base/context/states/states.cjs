
const { StackTree } = require('../../../../util/stack.cjs');



class States extends StackTree {

    goSub() {
        this.push({})
    }
    returnFromSub() {
        return this.pop()
    }
}


module.exports = { States }