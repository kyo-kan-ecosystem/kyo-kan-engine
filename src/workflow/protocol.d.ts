export type UnitConfigure = {
    data: any?,
    configure: any


}
export type UnitConfigures = UnitConfigure[]
export type ApplyResponse = {
    name: string,
    calleId: string
    configures: UnitConfigures


}