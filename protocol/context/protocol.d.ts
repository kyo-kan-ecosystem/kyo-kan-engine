import type { Context: ContextType } from '../../src/context/index.cjs'
export type Context = ContextType
export type MaybeContexts = ContextType | ContextType[]
export type SerializableClass = {
    getSerializableData(): any
}