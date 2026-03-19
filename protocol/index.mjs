import Module from "node:module";
const require = Module.createRequire(import.meta.url);

export const { AbstractExecutorPlugin } = require('./executor/abstract_class.cjs')
export const { AbstractWorkflow } = require('./workflow/protocol.class.cjs')

