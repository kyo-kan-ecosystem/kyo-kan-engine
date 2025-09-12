
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

        this._initPaths(initData);
        this._initID(initData);
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



    }
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas)) {
            serializedData[key] = value.getSerializedData();

        }
    }
    getSerializedData() {
        const serializedData = {};
        for (const [key, value] of Object.entries(this._paths)) {
            serializedData[key] = value.getSerializedData();

        }
        return serializedData
    }
    setPath(paths) {
        this._paths = paths

    }

    clone() {

        se
        const newTree = new this.constructor()

        return newTree;
    }



}

module.exports = { StateTree }