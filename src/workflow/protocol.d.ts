import { Repositry } from "../repositry/base.cjs"

export type UnitConfigure<UnitConfigureDataType = any> = {
    data: UnitConfigureDataType,
    configure: any


}
export type UnitConfigures<UnitConfigureDataType = any> = UnitConfigure<UnitConfigureDataType>[]
export type ApplyResponse<UnitConfigureDataType = any> = {
    name: string,
    calleId: string
    configures: UnitConfigures<UnitConfigureDataType>


}

export type WorkflowContext = {
    workflows: Repositry
}