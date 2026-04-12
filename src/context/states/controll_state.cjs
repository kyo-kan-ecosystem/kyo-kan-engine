

class ControllState {
    /**
     * @type {import("../../util/stack/stack.cjs").StackTree<any, import("../../controller/protocol").StateType>}
     */
    _state
    /**
     * 
     * @param {import("../../util/stack/stack.cjs").StackTree<any, import("../../controller/protocol").StateType>} state 
     */
    constructor(state) {
        this._state = state
    }
    /**
     * 
     * @param {keyof import("../../controller/protocol").ControllStateType} key 
     * @param {*} value 
     */
    setControll(key, value) {
        const state = this._state.get() || {}
        const controlls = state.controlls || {}
        controlls[key] = value
        state.controlls = controlls

        this._state.update(state)

    }
    /**
     * @param {any} controlls
     */
    setControlls(controlls) {
        const state = this._state.get() || {}


        state.controlls = Object.assign({}, state.controlls || {}, controlls)

        this._state.update(state)
    }
    /**
     * @param {any} executorId
     */
    setExecutorId(executorId) {
        this.setControll('executorId', executorId)

    }

    /**
     * @param {any} callback
     */
    setCallback(callback) {
        this.setControll('callback', callback)

    }
    /**
     * @param {import("../../controller/protocol").ExecuteMode} executeMode
     */
    setExecuteMode(executeMode) {
        this.setControll('executeMode', executeMode)

    }
    getExecuteMode() {
        return this._state.get()?.controlls?.executeMode
    }
    /**
     * @param {any} subworkflowId
     */
    goSub(subworkflowId, subworkflowInit = null) {
        this.setExecuteMode('goSub')
        this.setControll('subworkflowId', subworkflowId)
        this.setControll('subworkflowInit', subworkflowInit)


    }




}

// @ts-ignore
module.exports = { ControllState }