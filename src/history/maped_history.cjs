const deepmerge = require("deepmerge")
const equal = require('fast-deep-equal');

/**
 * @typedef {{log:any, count:number}} Log
 * @typedef {{[k in any]:Log}} Logs
 * @typedef {{id:any, depth:number}} BranchLogItem
 * @typedef {BranchLogItem[]} BranchLog
 * @typedef {{[key in any]:BranchLog}} BranchLogs
 * @typedef {{n:number}} CountRef
 * @typedef {{[k in any]:any}} LinkMap
 * @typedef {{[k in any]:number}} LinkedCounts
 * @typedef {{logs?:Logs, branchLogs?:BranchLogs, countRef?:CountRef, linkMap?:LinkMap, linkedCounts?:LinkedCounts}} SerializedHistoryData
 * @typedef {{log:any, depth:number}} BranchHead
 */

/**
 * Manages a history of states organized into branches, similar to a version control system.
 * It stores logs (states) in a map and tracks which log belongs to which step in a branch's history.
 * This allows for efficient storage by reusing identical states across different branches or history points.
 * Multiple instances can share the same underlying data store, allowing for lightweight branching ('forking').
 */
class MapedHistory {
    /**
     * A map storing the actual log data and its reference count.
     * @protected
     * @type {Logs} 
     */
    _logs;

    /**
     * A map where keys are branch IDs and values are arrays of log items,
     * representing the history of each branch.
     * @protected
     * @type {BranchLogs}
     */

    _branchLogs;
    /**
     * The ID of the currently active branch for this instance.
     * @protected
     * @type {any}
     */
    _branchId
    /**
     * A shared counter object to generate unique log IDs.
     * Shared across forked instances.
     * @protected
     * @type {{n:number}}
     */
    _countRef

    /**
     * A map to track the parent-child relationship between branches.
     * Key: child branch ID, Value: parent branch ID.
     * @protected
     * @type {LinkMap}
    */
    _linkMap

    /**
     * A map to count the number of child branches for a given branch.
     * Key: parent branch ID, Value: number of children.
     * @protected
     * @type {LinkedCounts}
    */
    _linkedCounts

    /**
     * Initializes a new MapedHistory instance.
     * @param {SerializedHistoryData?} [initData] - Optional data to initialize the history from.
     * If provided, the new instance can either be a deserialized state or a fork sharing data with another instance.
     */
    constructor(initData) {
        const _initData = initData || {}
        this._logs = _initData.logs || {}
        this._branchLogs = _initData.branchLogs || {}
        this._countRef = _initData.countRef || { n: 0 }
        this._linkMap = _initData.linkMap || {}
        this._linkedCounts = _initData.linkedCounts || {}
        this._branchId = 0;



    }

    /**
     * Creates a new log entry with a unique ID and a reference count of 1.
     * This is an internal method used by `addNewLog`.
     * The provided data is deep-cloned to prevent mutation.
     * @protected
     * @param {any} data - The log data to store.
     * @returns {number} The ID of the newly created log.
     */
    add(data) {
        const newId = this._countRef.n;
        this._countRef.n += 1;
        /**
         * @type {Log}
         */
        const log = { log: deepmerge({}, data), count: 1 }
        this._logs[newId] = log;
        return newId;
    }
    /**
     * Adds a new, unique log to the history of a specific branch.
     * @param {any} data - The data for the new log.
     * @param {number} depth - The depth or step in the history for this log.
     * @param {any} [branchId=null] - The ID of the branch to add the log to. Defaults to the current instance's branch ID.
     * @returns {number} The ID of the new log.
     */
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
    /**
     * Adds a reference to an existing log to a branch's history.
     * This is used when a state is repeated, avoiding data duplication.
     * It increments the reference count of the existing log.
     * @param {any} id - The ID of the existing log to reference.
     * @param {number} depth - The depth or step in the history for this log reference.
     * @param {any} [branchId=null] - The ID of the branch to add the log to. Defaults to the current instance's branch ID.
     * @returns {any} The ID of the referenced log.
     */
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
    /**
     * Moves the history of a branch forward with new data.
     * If the new data is identical to the current head of the branch, it adds a non-updating reference.
     * Otherwise, it adds a new log entry.
     * @param {any} data - The data for the next state.
     * @param {number} depth - The depth for the new history step.
     * @param {any} branchId - The ID of the branch to move forward.
     * @returns {any} The ID of the log at the new head of the branch.
     */
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

    /**
     * Compares the existing log data with new data to check for equality.
     * The base implementation uses strict reference equality (===).
     * @protected
     * @param {any} logData - The existing log data from the history.
     * @param {any} data - The new data to compare.
     * @returns {boolean} True if the data is considered equal.
     */
    _checkEqual(logData, data) {
        return logData === data

    }

    /**
     * Sets the active branch ID for this history instance.
     * If the branch does not exist, it initializes an empty history for it.
     * @param {any} branchId - The ID of the branch to activate.
     */
    setBranchId(branchId) {
        if (!branchId && branchId !== 0) {
            throw new Error(`branchId  is not defined`);
        }
        this._branchId = branchId;
        if (branchId in this._branchLogs === false) {
            this._branchLogs[branchId] = []
        }
    }
    /**
     * Retrieves the head (most recent log and its depth) of a specific branch.
     * @param {any?} [branchId] - The ID of the branch. Defaults to the current instance's branch ID.
     * @param {boolean} [isStrict=true] - If true, throws an error if the branch is not found or is empty. If false, returns null.
     * @returns {BranchHead | null} The head of the branch, or null if not found and not in strict mode.
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
     * Retrieves the ID of the log at the head of a specific branch.
     * @param {any?} [branchId] - The ID of the branch. Defaults to the current instance's branch ID.
     * @param {boolean} [isStrict=true] - If true, throws an error if the branch is not found or is empty. If false, returns null.
     * @returns {any | null} The ID of the head log, or null if not found and not in strict mode.
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
     * Moves one step back in the history of a branch.
     * It removes the head log item from the branch and decrements the log's reference count.
     * If the reference count drops to zero, the log data is deleted.
     * @param {any?} [branchId] - The ID of the branch to go back on. Defaults to the current instance's branch ID.
     * @returns {{removedLogItem: BranchLogItem, logExist: boolean}} An object containing the removed history item and a flag indicating if the branch still has history.
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
     * Returns a serializable, deep copy of the entire history state.
     * This is useful for persisting the history or transferring it.
     * @returns {SerializedHistoryData} A deep copy of the history data.
     */
    getSerializedData() {
        /**
         * @type {SerializedHistoryData}
         */
        const result = {
            logs: deepmerge({}, this._logs),
            branchLogs: deepmerge({}, this._branchLogs),
            countRef: Object.assign({}, this._countRef),
            linkMap: Object.assign({}, this._linkMap),
            linkedCounts: Object.assign({}, this._linkedCounts)
        }

        return result
    }
    /**
     * Creates a new `MapedHistory` instance that shares the same underlying data store.
     * This is a lightweight way to create a new branch of history.
     * @param {any} [branchId] - The ID for the new branch. If not provided, a new unique ID is generated.
     * @returns {this} A new `MapedHistory` instance pointing to the new branch.
     */
    fork(branchId) {
        /**
         * @type {SerializedHistoryData}
         */
        const initData = { logs: this._logs, branchLogs: this._branchLogs, countRef: this._countRef, linkedCounts: this._linkedCounts, linkMap: this._linkMap }
        /**
         * @type {typeof this}
         */
        // @ts-ignore
        const result = new this.constructor(initData)

        let _branchId = branchId;
        if (!branchId && branchId !== 0) {
            _branchId = this._countRef.n;
            this._countRef.n += 1;
            this._linkMap[_branchId] = this._branchId
            this._linkedCounts[this._branchId] = (this._linkedCounts[this._branchId] || 0) + 1
        }
        result.setBranchId(_branchId)
        return result;

    }
    /**
     * Deletes a branch and its history log.
     * It also decrements the linked count of its parent branch.
     * @param {any} [branchId] - The ID of the branch to remove. Defaults to the current instance's branch ID.
     */
    removeBranch(branchId) {
        let _branchId = branchId;
        if (!branchId && branchId !== 0) {
            _branchId = this._branchId
        }
        if (_branchId in this._branchLogs === false) {
            throw new Error(`branchId ${_branchId} is not found`);

        }
        const parentId = this._linkMap[_branchId];
        if (parentId in this._linkedCounts) {
            this._linkedCounts[parentId] -= 1
        }
        delete this._branchLogs[_branchId]
        delete this._linkMap[_branchId]
    }
    /**
     * Gets the number of child branches forked from a given branch.
     * @param {any} [branchId] - The ID of the branch to check. Defaults to the current instance's branch ID.
     * @returns {number} The number of child branches.
     */
    getLinkedCount(branchId) {
        let _branchId = branchId;
        if (!_branchId && branchId !== 0) {
            _branchId = this._branchId
        }
        if (_branchId in this._linkedCounts === false) {
            throw new Error(`linked count for branchId ${_branchId} is not found`);


        }
        return this._linkedCounts[_branchId]
    }
    /**
     * Gets the ID of the parent branch for a given branch.
     * @param {any} [branchId] - The ID of the child branch. Defaults to the current instance's branch ID.
     * @returns {any | undefined} The parent branch ID, or undefined if it's a root branch.
     */
    getParentBranchId(branchId) {
        const _branchId = branchId || this._branchId
        return this._linkMap[_branchId]
    }

}
/**
 * An extension of `MapedHistory` that uses deep equality to compare log states.
 * It also ensures that all added logs are deep-cloned to prevent external mutations
 * from affecting the history.
 */
class MapedHistoryDeepEqual extends MapedHistory {
    /**
     * Overrides the parent method to ensure data is deep-cloned before being added.
     * This prevents the stored log from being mutated externally.
     * @param {any} data - The data for the new log.
     * @param {number} depth - The depth or step in the history for this log.
     * @param {any} [branchId=null] - The ID of the branch to add the log to.
     * @returns {number} The ID of the new log.
     */
    addNewLog(data, depth, branchId = null) {
        const _data = this._unlinkLog(data)
        return super.addNewLog(_data, depth, branchId)

    }
    /**
     * Overrides the parent method to use deep equality (`fast-deep-equal`) for comparing objects.
     * @protected
     * @param {any} logData - The existing log data from the history.
     * @param {any} data - The new data to compare.
     * @returns {boolean} True if the data is deeply equal.
     */
    _checkEqual(logData, data) {
        return equal(logData, data)

    }
    /**
     * Creates a deep clone of the log data to break any references.
     * This ensures that the history state is immutable.
     * @protected
     * @param {any} log - The log data to clone.
     * @returns {any} A deep clone of the log data.
     */
    _unlinkLog(log) {
        const logtype = typeof log;

        if (logtype === 'undefined' || log === null) {
            return log
        }
        if (logtype === 'object') {
            if (log instanceof Date) {
                return new Date(log.getTime());
            }
            return deepmerge({}, log)
        }
        else {
            return log
        }

    }
}





module.exports = { MapedHistory, MapedHistoryDeepEqual };
