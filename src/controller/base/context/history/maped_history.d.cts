export type Log = {
    log: any;
    count: number;
};
export type Logs = { [k in any]: Log; };
export type BranchLogItem = {
    id: any;
    depth: number;
};
export type BranchLog = BranchLogItem[];
export type BranchLogs = { [key in any]: BranchLog; };
export type CountRef = {
    n: number;
};
export type LinkMap = { [k in any]: any; };
export type LinkedCounts = { [k in any]: number; };
export type SerializedHistoryData = {
    logs?: Logs;
    branchLogs?: BranchLogs;
    countRef?: CountRef;
    linkMap?: LinkMap;
    linkedCounts?: LinkedCounts;
};
export type BranchHead = {
    log: any;
    depth: number;
};
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
export class MapedHistory {
    /**
     * Initializes a new MapedHistory instance.
     * @param {SerializedHistoryData?} [initData] - Optional data to initialize the history from.
     * If provided, the new instance can either be a deserialized state or a fork sharing data with another instance.
     */
    constructor(initData?: SerializedHistoryData | null);
    /**
     * A map storing the actual log data and its reference count.
     * @protected
     * @type {Logs}
     */
    protected _logs: Logs;
    /**
     * A map where keys are branch IDs and values are arrays of log items,
     * representing the history of each branch.
     * @protected
     * @type {BranchLogs}
     */
    protected _branchLogs: BranchLogs;
    /**
     * The ID of the currently active branch for this instance.
     * @protected
     * @type {any}
     */
    protected _branchId: any;
    /**
     * A shared counter object to generate unique log IDs.
     * Shared across forked instances.
     * @protected
     * @type {{n:number}}
     */
    protected _countRef: {
        n: number;
    };
    /**
     * A map to track the parent-child relationship between branches.
     * Key: child branch ID, Value: parent branch ID.
     * @protected
     * @type {LinkMap}
    */
    protected _linkMap: LinkMap;
    /**
     * A map to count the number of child branches for a given branch.
     * Key: parent branch ID, Value: number of children.
     * @protected
     * @type {LinkedCounts}
    */
    protected _linkedCounts: LinkedCounts;
    /**
     * Creates a new log entry with a unique ID and a reference count of 1.
     * This is an internal method used by `addNewLog`.
     * The provided data is deep-cloned to prevent mutation.
     * @protected
     * @param {any} data - The log data to store.
     * @returns {number} The ID of the newly created log.
     */
    protected add(data: any): number;
    /**
     * Adds a new, unique log to the history of a specific branch.
     * @param {any} data - The data for the new log.
     * @param {number} depth - The depth or step in the history for this log.
     * @param {any} [branchId=null] - The ID of the branch to add the log to. Defaults to the current instance's branch ID.
     * @returns {number} The ID of the new log.
     */
    addNewLog(data: any, depth: number, branchId?: any): number;
    /**
     * Adds a reference to an existing log to a branch's history.
     * This is used when a state is repeated, avoiding data duplication.
     * It increments the reference count of the existing log.
     * @param {any} id - The ID of the existing log to reference.
     * @param {number} depth - The depth or step in the history for this log reference.
     * @param {any} [branchId=null] - The ID of the branch to add the log to. Defaults to the current instance's branch ID.
     * @returns {any} The ID of the referenced log.
     */
    addNonUpdateLog(id: any, depth: number, branchId?: any): any;
    /**
     * Moves the history of a branch forward with new data.
     * If the new data is identical to the current head of the branch, it adds a non-updating reference.
     * Otherwise, it adds a new log entry.
     * @param {any} data - The data for the next state.
     * @param {number} depth - The depth for the new history step.
     * @param {any} branchId - The ID of the branch to move forward.
     * @returns {any} The ID of the log at the new head of the branch.
     */
    forward(data: any, depth: number, branchId: any): any;
    /**
     * Compares the existing log data with new data to check for equality.
     * The base implementation uses strict reference equality (===).
     * @protected
     * @param {any} logData - The existing log data from the history.
     * @param {any} data - The new data to compare.
     * @returns {boolean} True if the data is considered equal.
     */
    protected _checkEqual(logData: any, data: any): boolean;
    /**
     * Sets the active branch ID for this history instance.
     * If the branch does not exist, it initializes an empty history for it.
     * @param {any} branchId - The ID of the branch to activate.
     */
    setBranchId(branchId: any): void;
    /**
     * Retrieves the head (most recent log and its depth) of a specific branch.
     * @param {any?} [branchId] - The ID of the branch. Defaults to the current instance's branch ID.
     * @param {boolean} [isStrict=true] - If true, throws an error if the branch is not found or is empty. If false, returns null.
     * @returns {BranchHead | null} The head of the branch, or null if not found and not in strict mode.
     */
    getBranchHead(branchId?: any | null, isStrict?: boolean): BranchHead | null;
    /**
     * Retrieves the ID of the log at the head of a specific branch.
     * @param {any?} [branchId] - The ID of the branch. Defaults to the current instance's branch ID.
     * @param {boolean} [isStrict=true] - If true, throws an error if the branch is not found or is empty. If false, returns null.
     * @returns {any | null} The ID of the head log, or null if not found and not in strict mode.
     */
    getBranchHeadId(branchId?: any | null, isStrict?: boolean): any | null;
    /**
     * Moves one step back in the history of a branch.
     * It removes the head log item from the branch and decrements the log's reference count.
     * If the reference count drops to zero, the log data is deleted.
     * @param {any?} [branchId] - The ID of the branch to go back on. Defaults to the current instance's branch ID.
     * @returns {{removedLogItem: BranchLogItem, logExist: boolean}} An object containing the removed history item and a flag indicating if the branch still has history.
     */
    back(branchId?: any | null): {
        removedLogItem: BranchLogItem;
        logExist: boolean;
    };
    /**
     * Returns a serializable, deep copy of the entire history state.
     * This is useful for persisting the history or transferring it.
     * @returns {SerializedHistoryData} A deep copy of the history data.
     */
    getSerializedData(): SerializedHistoryData;
    /**
     * Creates a new `MapedHistory` instance that shares the same underlying data store.
     * This is a lightweight way to create a new branch of history.
     * @param {any} [branchId] - The ID for the new branch. If not provided, a new unique ID is generated.
     * @returns {this} A new `MapedHistory` instance pointing to the new branch.
     */
    fork(branchId?: any): this;
    /**
     * Deletes a branch and its history log.
     * It also decrements the linked count of its parent branch.
     * @param {any} [branchId] - The ID of the branch to remove. Defaults to the current instance's branch ID.
     */
    removeBranch(branchId?: any): void;
    /**
     * Gets the number of child branches forked from a given branch.
     * @param {any} [branchId] - The ID of the branch to check. Defaults to the current instance's branch ID.
     * @returns {number} The number of child branches.
     */
    getLinkedCount(branchId?: any): number;
    /**
     * Gets the ID of the parent branch for a given branch.
     * @param {any} [branchId] - The ID of the child branch. Defaults to the current instance's branch ID.
     * @returns {any | undefined} The parent branch ID, or undefined if it's a root branch.
     */
    getParentBranchId(branchId?: any): any | undefined;
}
/**
 * An extension of `MapedHistory` that uses deep equality to compare log states.
 * It also ensures that all added logs are deep-cloned to prevent external mutations
 * from affecting the history.
 */
export class MapedHistoryDeepEqual extends MapedHistory {
    /**
     * Creates a deep clone of the log data to break any references.
     * This ensures that the history state is immutable.
     * @protected
     * @param {any} log - The log data to clone.
     * @returns {any} A deep clone of the log data.
     */
    protected _unlinkLog(log: any): any;
}
