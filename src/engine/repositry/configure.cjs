const { Repositry } = require("../../repositry/base.cjs")


/**
 * @type {import("./protocol").EngineConfigure}
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
    },
    sequence: {
        start: 'start',
        resume: 'resume'
    },
    boot: {
        callback: 'boot'
    }
}
/**
 * @extends {Repositry<import("./protocol").EngineConfigure>}
 */
class EngineConfigureRepositry extends Repositry {
    constructor(datas = DEFAULT_ENGINE_CONFIGURE) {
        super({ engine: datas })



    }
    /**
     * 
     * @param {import("./protocol").EngineConfigure} datas 
     */
    set(datas) {
        super.set('engine', datas)
    }
    get() {
        return super.get('engine')
    }

}

module.exports = { EngineConfigureRepositry, DEFAULT_ENGINE_CONFIGURE }