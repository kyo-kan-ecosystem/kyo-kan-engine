import { createId } from "../../util/create_id.cjs"


class ControllState {
    /**
     * @type {import("./states.cjs").StatesType}
     */
    _state
    /**
     * 
     * @param {import("./states.cjs").StatesType} state 
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
     * 
     * @param {keyof import("../../controller/protocol").ControllStateType} key
     */
    getControlls(key) {
        return this._state.get()?.controlls ? [key]
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
     * @param {any} subworkflowName
     */
    goSub(subworkflowName, subworkflowInit = null) {
        this.setExecuteMode('goSub')
        const subworkflowId = createId(this.getControlls('executorId'), subworkflowName)
        this.setControll('subworkflowId', subworkflowId)
        this.setControll('subworkflowInit', subworkflowInit)


    }




}

// @ts-ignore
module.exports = { ControllState }