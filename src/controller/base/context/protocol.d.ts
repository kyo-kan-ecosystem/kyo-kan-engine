import { States } from "./states/states.cjs"
import { Bords } from "./bords/bords.cjs"
import { Repositries } from "./repositries.cjs"
import { Workflows } from "./workflows.cjs"
import { Histories } from "./histories.cjs"
export type StackTrees = {
    states: States,
    bords: Bords
}

export type ContextInit<FunctionsType, ReporterType> = Partial<{
    states: any,
    repositries: any,
    bords: any,
    workflows: any,
    histories: any,
    functions: FunctionsType,
    branches: Object<any, any>,
    reporter: ReporterType,
    _countRef: { n: number }
}>

export type ContextInheritance = {
    states: any,
    repositries: any,
    bords: any,
    workflows: any,
    histories: any,
    functions: any,
    branches: any,
    reporter: any,
    _countRef: any



}

