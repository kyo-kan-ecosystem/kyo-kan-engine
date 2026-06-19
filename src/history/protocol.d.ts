

export type Log<LogT = any> = {
    log: LogT,
    count: number
}

export type Logs<LogT = any> = {
    [k in any]: Log<LogT>
}




export type BackResult = {
    log: LogT,
    depth: number,
    branchId: any
}



export type BranchLogItem = {
    id: any,
    depth: number
}
export type BranchLog = BranchLogItem[]
export type BranchLogs = {
    [key in any]: BranchLog
}
export type CountRef = {
    history: number,
    branch: number
}

export type LinkItem = {
    branchId: any,
    step: number
}

export type LinkMap = {
    [k in any]: LinkItem
}
export type BranchOutMap = {
    [k in any]: {
        branchId: any,
        branchOutStep: any
    }
}
export type LinkedCounts = {
    [k in any]: number
}
export type SerializedHistoryData<LogT = any> = {
    logs?: Logs<LogT>,
    branchLogs?: BranchLogs,
    countRef?: CountRef, reverseLinkMap?: LinkMap, linkedCounts?: LinkedCounts, branchOutMap?: BranchOutMap, branchId: number
}
export type BranchHead = {
    log: any,
    depth: number
}

export type BackResult<LogT = any> = {
    log: LogT;
    depth: number;
    branchId: any;
}