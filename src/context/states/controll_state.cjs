const { ControllStateValueNotExistError } = require("./protocl.class.cjs")

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
     * @template {keyof import("../../controller/protocol").ControllStateType} KeyType
     * @overload
     * @param {KeyType} key
     * @param {true} isStrict
     * @returns {import("../../controller/protocol").ControllStateType[KeyType]}
     * 
     * @overload
    *  @param {KeyType} key
     * @param {false} isStrict 
     * @returns {import("../../controller/protocol").ControllStateType[KeyType]?}
     */
    // @ts-ignore
    getControll(key, isStrict = true) {
        // @ts-ignore
        const ret = this._state.now.get()?.controlls?.[key]
        if (isStrict === true && (ret === null || typeof ret === 'undefined')) {
            throw new ControllStateValueNotExistError(key)


        }
        return ret


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
    getCallback() {
        return this.getControll('callback', false)
    }

    /**
     * @param {import("../../sequence/protocol").ExecuteMode} executeMode
     */
    setExecuteMode(executeMode) {
        this.setControll('executeMode', executeMode)

    }
    /**
     * 
     * @param {boolean} isStrict 
     * 
     */
    getExecuteMode(isStrict = true) {

        // @ts-ignore
        return this.getControll('executeMode', isStrict)
    }
    /**
     * @param {any} subworkflowName
     * @param {any} [subworkflowInit=null] 
     */
    goSub(subworkflowName, subworkflowInit = null) {
        this.setExecuteMode('goSub')
        const subworkflowId = createId(this.getControll('executorId', false) || '', subworkflowName)
        this.setControll('subworkflowId', subworkflowId)
        this.setControll('subworkflowInit', subworkflowInit || {})


    }




}


module.exports = { ControllState }