
const { StateNode } = require('./state.cjs')

/**
 * @typedef {}
 * 
 */
class StateTree {
    /**
     *
     * @param {Object | null} initData 
     * @param {typeof StateNode} stateClass 
     */
    constructor(initData = null, stateClass = StateNode) {


        this._stateClass = stateClass;
        this._initID(initData);
        this._initPaths(initData);
        this._setId(0)

    }
    isEnd() {
        return this._paths[this._id].isEmpty()
    }
    isTop() {
        return this.topId == this._id
    }
    switchId(id) {
        /**
         * @type {typeof this}
         */
        const responseObj = new this.constructor(false, this._stateClass)
        responseObj.setPaths(this._paths)
        responseObj._id = this._id
        return responseObj;

    }
    _setId(id) {
        const _id = id || 0;
        this._id = _id;

    }
    /**
     * 
     * @param {*} state 
     */
    update(state) {

        this._paths[this._id].update(state)

    }
    get() {
        return this._paths[this._id].get()
    }
    /**
     * 
     * @param {Object?} initData 
     */
    _initID(initData) {
        if (!initData) {

            this._count = -1
        }
        else {

            this._count = Object.keys(initData).length - 1
        }
    }
    /**
     * 
     * @param {any} initData 
     */
    _initPaths(initData) {
        /**
         * @type {{[x in any]: StateNode}}
         */
        this._paths = {}
        this.topId = 0;
        if (init === false) {
            return

        }
        if (init === null) {
            this._paths[this.topId] = new this._stateClass()

        }
        else {
            this.setSerializedData(initData)


        }



    }
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas)) {
            this._paths[key] = new this._stateClass(value);

        }
    }
    getSerializedData() {
        const serializedData = {};
        for (const [key, value] of Object.entries(this._paths)) {
            serializedData[key] = value.getSerializedData();

        }
        return serializedData
    }
    setPaths(paths) {
        this._paths = paths

    }





}

module.exports = { StateTree }