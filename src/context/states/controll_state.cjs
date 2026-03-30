import { StackTree } from "../../util/stack/stack.cjs"

class ControllState {
    /**
     * @type {StackTree<any, import("../../controller/protocol").StateType>}
     */
    _state
    /**
     * 
     * @param {*} state 
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
    setControlls(controlls) {
        const state = this._state.get() || {}


        state.controlls = Object.assign({}, state.controlls || {}, controlls)

        this._state.update(state)
    }
    setExecutorId(executorId) {
        this.setControll('executorId', executorId)

    }

    setCallback(callback) {
        this.setControll('callback', callback)

    }
    setExecuteMode(executeMode) {
        this.setControll('executeMode', executeMode)

    }
    goSub(subworkflowId, subworkflowInit = null) {
        this.setExecuteMode('goSub')
        this.setControll('subworkflowId', subworkflowId)
        this.setControll('subworkflowInit', subworkflowInit)


    }



}

module.exports = { ControllState }