import Module from "node:module"
const require = Module.createRequire(import.meta.url)

export const { BasicWithGetSubworkflowClass } = require('./executor/baic_class.cjs')
export const { AbstractWorkflow } = require('./workflow/class.cjs')

