import type { Context } from '../../src/context/class.cjs';
export type { Context as Class } from '../../src/context/class.cjs';
export type Contexts = ContextClass[]
export type MaybeContexts = Contexts | ContextClass;
export type SerializableClass = {
    getSerializableData(): any
}



