const { Repositry } = require("../../repositry/base.cjs")

/**
 * @typedef {{root:{workflow:{plugin:string, id:string}}}} EngineConfigure
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

    }
}

class EngineConfigureRepositry extends Repositry {
    constructor(datas = DEFAULT_ENGINE_CONFIGURE) {
        super(datas)



    }

}

module.exports = { EngineConfigureRepositry, DEFAULT_ENGINE_CONFIGURE }