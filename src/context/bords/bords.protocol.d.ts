import { StackTreeReferenceData } from "../../util/stack/protocol"

export type BordsProtocol {
    current?: any
    workflow?: any,
    subworkflow?: any,


}
export type BordRefernceData = {
    nameMap: any,
    global: any,
}
export type BordsReferenceDataProtocol = StackTreeReferenceData & BordRefernceData