class ControllerContext {
    /**
     * 
     * @param {*} states 
     * @param {*} workflowUints 
     */
    constructor(states = [], workflowUints) {
        /**
         * @type {Array}
         */
        this.states = states

        this.workflowUints = workflowUints
    }
    /**
     * 
     * @returns {false | any}
     */
    getState() {
        if (this.states.length == 0) {
            return false
        }
        return this.states[this.states.length - 1]
    }
    popState() {
        if (this.states.length == 0) {
            return false
        }
        this.states.pop()
        return this.getState()
    }
    pushState(state) {
        this.states.push(state)

    }
    updateState(state) {
        this.states[this.states.length - 1] = state
    }




}