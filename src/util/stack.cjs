class Stack {
    /**
     * 
     * @param {any} elements 
     * 
     */
    constructor(elements) {
        /**
         * @type {Array}
         */
        this._elements = (elements || []).copyWithin()


    }
    isEmpty() {
        return this._elements.length == 0
    }
    /**
     * 
     * @returns {false | any}
     */
    get() {
        if (this._elements.length == 0) {
            return false
        }
        return this._elements[this._elements.length - 1]
    }
    pop() {
        if (this._elements.length == 0) {
            return false
        }
        this._elements.pop()
        return this.get()
    }
    push(element) {
        this._elements.push(element)

    }
    update(element) {
        this._elements[this._elements.length - 1] = element
    }




}
module.exports = { Stack }