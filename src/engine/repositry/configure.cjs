const { Repositry } = require("../../repositry/base.cjs")

/**
 * @typedef {{root:{workflow:{plugin:string, id:string}},executor:{enterFunc:string}}} EngineConfigure
 */

/**
 * @type {EngineConfigure}
 */
const DEFAULT_ENGINE_CONFIGURE = {
    root: {
        workflow: {
            plugin: 'step',
            id: ''
        }

    },
    executor: {
        enterFunc: 'enter'
    }
}
/**
 * @extends {Repositry<EngineConfigure>}
 */
class EngineConfigureRepositry extends Repositry {
    constructor(datas = DEFAULT_ENGINE_CONFIGURE) {
        super({ engine: datas })



    }
    get() {
        return super.get('engine')
    }

}

module.exports = { EngineConfigureRepositry, DEFAULT_ENGINE_CONFIGURE }