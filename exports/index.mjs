import { createRequire } from "module"
const require = createRequire(import.meta.url);

/**
 *@type {import('../src/index.cjs')} 
 */
export const Src = require('../src/index.cjs')
