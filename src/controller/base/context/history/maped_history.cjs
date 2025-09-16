const deepmerge = require("deepmerge")
const equal = require('fast-deep-equal');

/**
 * @typedef {{log:any, count:number}} LogFormat
 *
 * @typedef {{id:any, depth:number}} BranchLogItem
 * @typedef {BranchLogItem[]} BranchLog
 * @typedef {{[key in any]:BranchLog}} BranchLogs
 * @typedef {{n:number}} CountRef
 * @typedef {{logs?:Array<[any, LogFormat]>, branchLogs?:BranchLogs, countRef?:CountRef}} SerializedHistoryData
 * @typedef {{log:any, depth:number}} BranchHead
 */

class MapedHistory {
    /**
     * 
     * @type {{[k in any]: LogFormat}} 
     */
    _logs;

    /**
     * 
     * @type {BranchLogs}
     */

    _branchLogs;
    /**
     * 
     * @type {any}
     */
    _branchId
    /**
     * @type {{n:number}}
     */
    _countRef

    /**
     *@param {SerializedHistoryData} initData 
     */
    constructor(initData) {
        const _initData = initData || {}
        this._logs = _initData.logs || {};
        this._branchLogs = _initData.branchLogs || {};
        this._countRef = _initData.countRef || { n: 0 };
        this._branchId = 0;



    }

    /**
     * 
     * @param {any} data - new log data
     * @returns {number} - log id
     */
    add(data) {
        const newId = this._countRef.n;
        this._countRef.n += 1;
        /**
         * @type {LogFormat}
         */
        const log = { log: deepmerge({}, data), count: 1 }
        this._logs[newId] = log;
        return newId;
    }
    addNewLog(data, depth, branchId = null) {
        const _branchId = branchId || this._branchId;
        if (_branchId == null) {
            throw new Error(`branchId  is not defined`);
        }
        const newId = this.add(data)
        const branchLog = this._branchLogs[_branchId] || []
        /**
         * @type {BranchLogItem}
         */
        const branchLogItem = { id: newId, depth }
        branchLog.push(branchLogItem)
        this._branchLogs[_branchId] = branchLog
        return newId

    }
    addNonUpdateLog(id, depth, branchId = null) {
        const _branchId = branchId || this._branchId
        if (_branchId == null) {
            throw new Error(`branchId  is not defined`);
        }
        const branchLog = this._branchLogs[_branchId]
        if (typeof branchLog === 'undefined') {
            throw new Error(`branchId ${_branchId} is not found`);

        }

        /**
         * @type {BranchLogItem}
         */
        const branchLogItem = { id, depth }
        branchLog.push(branchLogItem)
        this._logs[id].count += 1
        return id



    }
    forward(data, depth, branchId) {
        const headerLog = this.getBranchHead(branchId, false)
        if (headerLog === null) {
            return this.addNewLog(data, depth, branchId)



        }
        else if (this._checkEqual(headerLog.log, data) === true) {
            const headerId = this.getBranchHeadId(branchId)
            this.addNonUpdateLog(headerId, depth, branchId)
            return headerId
        }
        else {
            return this.addNewLog(data, depth, branchId)

        }


    }
    _checkEqual(logData, data) {
        return logData === data

    }

    setBranchId(branchId) {
        this._branchId = branchId;
    }
    /**
     * 
     * @param {any?} branchId
     * @param {boolean} [isStrict=true]  
     * @returns {BranchHead}
     */
    getBranchHead(branchId, isStrict = true) {
        const _branchId = branchId || this._branchId;

        const branchLogs = this._branchLogs[_branchId];
        if (typeof branchLogs === 'undefined' || branchLogs.length == 0) {

            if (isStrict === true) {
                throw new Error(`branchId ${_branchId} is not found`);
            }
            return null;


        }
        const branchLogItem = branchLogs[branchLogs.length - 1]
        const log = this._logs[branchLogItem.id].log
        /**
         * @type {BranchHead}
         */
        const branchHead = { log, depth: branchLogItem.depth }
        return branchHead


    }
    /**
     * 
     * @param {any?} branchId
     * @param {boolean} [isStrict=true]  
     * @returns 
     */
    getBranchHeadId(branchId, isStrict = true) {
        const _branchId = branchId || this._branchId;
        if (_branchId == null || typeof _branchId === 'undefined') {
            throw new Error(`branchId  is not defined`);
        }
        const branchLogs = this._branchLogs[_branchId];
        if (typeof branchLogs === 'undefined' || branchLogs.length == 0) {

            if (isStrict === true) {
                throw new Error(`branchId ${_branchId} is not found`);
            }
            return null;


        }
        return branchLogs[branchLogs.length - 1].id
    }

    /**
     * 
     * @param {any?} branchId 
     * @returns {{removedLogItem:any, logExist:boolean}}
     */
    back(branchId) {
        const _branchId = branchId || this._branchId;
        const branchLogItems = this._branchLogs[_branchId];
        if (typeof branchLogItems === 'undefined' || branchLogItems.length == 0) {
            throw new Error(`branchId ${_branchId} is not found`);

        }
        const removedLogItem = branchLogItems.pop();
        const removedLogId = removedLogItem.id;
        const logExist = branchLogItems.length > 0;
        this._logs[removedLogId].count -= 1
        if (this._logs[removedLogId].count === 0) {
            delete this._logs[removedLogId];
        }


        return { removedLogItem, logExist };
    }
    /**
     * 
     * @returns {SerializedHistoryData}
     */
    getSerializedData() {
        /**
         * @type {SerializedHistoryData}
         */
        const result = { logs: deepmerge({}, this._logs), branchLogs: deepmerge({}, this._branchLogs), countRef: Object.assign({}, this._countRef) }

        return result
    }
    fork(branchId) {
        /**
         * @type {SerializedHistoryData}
         */
        const initData = { logs: this._logs, branchLogs: this._branchLogs, countRef: this._countRef }
        const result = new this.constructor(initData)
        result.setBranchId(branchId)
        return result;

    }

}
class MapedHistoryDeepEqual extends MapedHistory {
    _checkEqual(logData, data) {
        return equal(logData, data)

    }
}





module.exports = { MapedHistory, MapedHistoryDeepEqual };
