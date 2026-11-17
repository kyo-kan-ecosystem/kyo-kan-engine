/**
 * @type {import('./current_workflow.cjs')}
 */
const CurrentWorkflow = require('./current_workflow.cjs')

/**
 * @type {import('./global.cjs')}
 */

const Global = require('./global.cjs')


/**
 * @type {import('./sub_workflow.cjs')}
 */

const SubWorkflow = require('./sub_workflow.cjs')


module.exports = { CurrentWorkflow, SubWorkflow, Global }