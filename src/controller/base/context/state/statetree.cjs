
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
        this._count = 1
        this._id = 1

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
        responseObj._count = this._count
        responseObj._setId(this._id)
        return responseObj;

    }
    splitTree(splitCount) {
        let count = 0
        const results = []
        const linkPath = this._id
        const init = { linkPath }
        while (count < splitCount) {
            const id = this._count
            this._count += 1
            count += 1
            this._paths[id] = new this._stateClass(init)
            results.push(this.switchId(id))

        }
        return results


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
            this._paths[this.topId] = new this._stateClass({ id: this.topId })

        }
        else {
            this.setSerializedData(initData)


        }



    }
    /**
     * 
     * @param {{paths:any[], count:number}} datas 
     */
    setSerializedData(datas) {
        for (const [key, value] of Object.entries(datas.paths)) {
            this._paths[key] = new this._stateClass(value);

        }
        this._count = datas.count
    }
    getSerializedData() {
        const paths = {};
        for (const [key, value] of Object.entries(this._paths)) {
            paths[key] = value.getSerializedData();

        }
        return { paths, count: this._count }
    }
    setPaths(paths) {
        this._paths = paths


    }





}

module.exports = { StateTree }