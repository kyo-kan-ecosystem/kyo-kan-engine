import { States } from "./states/states.cjs"
import { Bords } from "./bords/bords.cjs"
import { Repositries } from "./repositries.cjs"
import { Workflows } from "../workflow/context.cjs"
import { Histories } from "./histories.cjs"
export type StackTrees = {
    states: States,
    bords: Bords
}

export type ForkFunctionType = (id: number?, context: any) => any
export interface MaybeForkInterface {
    fork: ForkFunctionType
}

export type MaybeForkType = {
    fork?: ForkFunctionType
}
export type MaybeForkTypeMap = {
    [key: string]: MaybeForkType
}
export type ContextSerializableData = Partial<{
    states: any,
    repositries: any,
    bords: any,
    workflows: any,
    histories: any,
    branches: Object<any, any>,
    executors: any,
    _countRef: { n: number }
    _linkMap: Object<any, any>

}>


export type ContextApi<FunctionsType = any, ReporterType = any> = {
    functions: FunctionsType,
    reporter: ReporterType,
}





export type ContextInheritance<FunctionsType extends MaybeForkTypeMap = any, ReporterType extends MaybeForkTypeMap = any> = {
    states: any,
    repositries: any,
    bords: any,
    workflows: any,
    histories: any,
    functions: any,
    branches: any,
    reporter: any,
    executors: any,
    _countRef: any,
    _linkMap: any
    branchId: number



}

