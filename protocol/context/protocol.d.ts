export { Context } from '../../src/context/class.cjs';
import type { Context as ContextClass } from '../../src/context/class.cjs';
export type Contexts = ContextClass[]
export type MaybeContexts = Contexts | ContextClass;
export type SerializableClass = {
    getSerializableData(): any
}



