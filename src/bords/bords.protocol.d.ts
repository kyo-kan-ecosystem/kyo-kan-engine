import { StackTreeReferenceData } from "../util/stack/protocol"

export type BordsProtocol {
    executor?: any
    workflow?: any,
    subworkflow?: any,


}
export type BordRefernceData = {
    nameMap: any,
    global: any,
}
export type BordsReferenceDataProtocol = StackTreeReferenceData & BordRefernceData