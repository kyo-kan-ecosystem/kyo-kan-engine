import Module from "node:module";
const require = Module.createRequire(import.meta.url);

const { AbstractExecutorPlugin } = require('./executor/abstract_class.cjs')

export { AbstractExecutorPlugin }
