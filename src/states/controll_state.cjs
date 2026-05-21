const { ControllStateValueNotExistError } = require("./protocl.class.cjs")

const { createId } = require("../util/create_id.cjs")


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
     * @param {keyof import("./protocol").ControllStateType} key 
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
     * @template {keyof import("./protocol").ControllStateType} KeyType
     * 
     * @overload
     * @param {KeyType} key
     * @param {true | undefined} [isStrict=True]
     * @returns {Required<import("./protocol").ControllStateType>[KeyType]}     
     * @overload
    *  @param {KeyType} key
     * @param {false} isStrict
     * @returns {import("./protocol").ControllStateType[KeyType] | undefined}     
     * */
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
    getExecutorId() {
        return this.getControll('executorId')
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
     * @param {import("../sequence/protocol").ExecuteMode} executeMode
     */
    setExecuteMode(executeMode) {
        this.setControll('executeMode', executeMode)

    }
    /**
     * 
     * @param {boolean} isStrict 
     * @throws {ControllStateValueNotExistError}
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
        this.setControll('subworkflowName', subworkflowName)

        this.setControll('subworkflowInit', subworkflowInit || {})



    }
    getSubworkflowName() {
        return this.getControll('subworkflowName')
    }
    getSubworkflowInit() {
        return this.getControll('subworkflowInit', false)
    }






}


module.exports = { ControllState }