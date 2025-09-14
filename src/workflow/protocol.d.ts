import { Repositry } from "../repositry/base.cjs"



export type UnitConfigure<UnitConfigureDataType = any> = {
    data: UnitConfigureDataType,
    id: any
    plugin: any


}
export type UnitConfigures<UnitConfigureDataType = any> = UnitConfigure<UnitConfigureDataType>[]

export type WorkflowPluginCofigure<WorkflowCofigureDataType = any> = {
    data: WorkflowCofigureDataType
    plugin: any

}


export type ApplyResponse<UnitConfigureDataType = any> = {
    name: string,
    calleId: string
    configures: UnitConfigures<UnitConfigureDataType>


}

export type WorkflowContext = {
    workflows: Repositry
}



