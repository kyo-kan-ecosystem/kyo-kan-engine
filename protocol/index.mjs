import Module from "node:module";
const require = Module.createRequire(import.meta.url);

const { AbstractExecutorPlugin } = require('./executor/abstract_class.cjs')
const { AbstractWorkflow } = require('./workflow/protocol.class.cjs')
export { AbstractExecutorPlugin, AbstractWorkflow }
