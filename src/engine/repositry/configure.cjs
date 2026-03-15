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

class EngineConfigureRepositry extends Repositry {
    constructor(datas = DEFAULT_ENGINE_CONFIGURE) {
        super(datas)



    }

}

module.exports = { EngineConfigureRepositry, DEFAULT_ENGINE_CONFIGURE }