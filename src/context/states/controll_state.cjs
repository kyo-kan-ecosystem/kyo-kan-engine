const { createId } = require("../../util/create_id.cjs")


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
        const state = this._state.now.get() || {}
        const controlls = state.controlls || {}
        controlls[key] = value
        state.controlls = controlls

        this._state.now.update(state)

    }
    /**
     * @param {any} controlls
     */
    setControlls(controlls) {
        const state = this._state.now.get() || {}


        state.controlls = Object.assign({}, state.controlls || {}, controlls)

        this._state.now.update(state)
    }
    /**
     * 
     * @param {keyof import("../../controller/protocol").ControllStateType} key
     */
    getControll(key) {
        return this._state.now.get()?.controlls?.[key]


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
        return this._state.now.get()?.controlls?.executeMode
    }
    /**
     * @param {any} subworkflowName
     * @param {any} [subworkflowInit=null] 
     */
    goSub(subworkflowName, subworkflowInit = null) {
        this.setExecuteMode('goSub')
        const subworkflowId = createId(this.getControll('executorId'), subworkflowName)
        this.setControll('subworkflowId', subworkflowId)
        this.setControll('subworkflowInit', subworkflowInit || {})


    }




}


module.exports = { ControllState }