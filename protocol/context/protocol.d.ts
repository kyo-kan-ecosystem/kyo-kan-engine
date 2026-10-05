export { Context } from '../../src/context/index.cjs';
import type { Context as ContextClass } from '../../src/context/index.cjs';
export type Contexts = ContextClass[]
export type MaybeContexts = Contexts | ContextClass;
export type SerializableClass = {
    getSerializableData(): any
}



