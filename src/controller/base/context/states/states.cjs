
const { StackTree } = require('../../../../util/stack.cjs');



class States extends StackTree {
    /**
     * @param {*} data
     */
    push(data) {
        let _data
        if (typeof data == 'undefined' || data === null) {
            _data = {}
        }
        else {
            _data = data
        }
        return super.push(_data)
    }
}


module.exports = { States }