const deepmerge = require("deepmerge")

class MapedHistory {
    /**
     * @private
     * @type {Map<number, any>} 
     */
    _logs;

    /**
     * @private 
     * @type {Map<any, any[]>}
     */

    _branchLogs;
    /**
     * 
     * @type {any}
     */
    _branchId



    /**
     *@param {{history?:any[], externalToInner?:any[], idToNumberObject?:any[], currentId?:number}} initData 
     */
    constructor(initData) {
        this._history = new Map(initData.history || []);
        this._branchLogs = new Map(initData.branchLog || []);
        this._branchId = null;



    }

    /**
     * 
     * @param {any} data - new log data
     * @returns {number} - log id
     */
    push(data) {
        const newId = this._logs.size;
        this._logs.set(newId, deepmerge({}, data));
        this._currentId = newId;
        return newId;
    }
    addNewLog(branchId, data) {
        const newId = this.push(data)
        const branchLogs = this._branchLogs.get(branchId) || []
        branchLogs.push(newId)
        this._branchLogs.set(branchId, branchLogs)
        return newId

    }
    addNonUpdateLog(branchId, id) {
        const branchLogs = this._branchLogs.get(branchId)
        if (typeof branchLogs === 'undefined') {
            throw new Error(`branchId ${branchId} is not found`);

        }
        const _id = id || branchLogs[branchLogs.length - 1]
        branchLogs.push(_id)
        this._branchLogs.set(branchId, branchLogs)



    }
    setBranchId(branchId) {
        this._branchId = branchId;
    }
    /**
     * 
     * @param {any?} branchId
     * @param {boolean} [isStrict=true]  
     * @returns 
     */
    getBranchHead(branchId, isStrict = true) {
        const _branchId = branchId || this._branchId;
        const branchLogs = this._branchLogs.get(_branchId);
        if (typeof branchLogs === 'undefined' || branchLogs.length == 0) {

            if (isStrict === true) {
                throw new Error(`branchId ${_branchId} is not found`);
            }
            return null;


        }
        return this._logs.get(branchLogs[branchLogs.length - 1]);
    }
    /**
     * 
     * @param {any?} branchId 
     * @returns {{removedLog:any, logExist:boolean}}
     */
    backBranchLog(branchId) {
        const _branchId = branchId || this._branchId;
        const branchLogs = this._branchLogs.get(_branchId);
        if (typeof branchLogs === 'undefined' || branchLogs.length == 0) {
            throw new Error(`branchId ${_branchId} is not found`);

        }
        const removedLog = branchLogs.pop();
        const logExist = branchLogs.length > 0;
        return { removedLog, logExist };
    }
    getSerializedData() {
        return { history: this._logs.entries(), branchLog: this._branchLogs.entries() }
    }
    clone() {
        const result = Object.assign({}, this);
        result.setBranchId(this._branchId);
        return result;

    }




}






module.exports = { MapedHistory };
