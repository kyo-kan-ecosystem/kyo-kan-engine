
import { SerializedHistoryData<number> } from "../../history/protocol"
export type ContextHistoryInit = {
    history?: SerializedHistoryData<number>;
    contextBranchId: any;
}