/**
 * @type {import('./boot.cjs')}
 */
const Boot = require('./boot.cjs')

/**
 * @type {import('./configure.cjs')}
 */
const Configure = require('./configure.cjs')

/**
 * @type {import('./plugin.cjs')}
 */
const Plugin = require('./plugin.cjs')

module.exports = { Boot, Configure, Plugin }