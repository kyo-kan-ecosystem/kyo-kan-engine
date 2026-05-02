const deepmerge = require("deepmerge")

const { DEFAULT_ENGINE_CONFIGURE } = require("../defaults/configure.cjs")

const { Repositry } = require("../../repositry/base.cjs")


/**
 * @extends {Repositry<import("./protocol").EngineConfigure>}
 */
class EngineConfigureRepositry extends Repositry {

    _key = 'engine'

    /**
     * 
     * @param {Partial<import("./protocol").EngineConfigure>?} datas 
     */
    constructor(datas, key = 'engine') {

        const configure = deepmerge(DEFAULT_ENGINE_CONFIGURE, datas || {})
        super({ [key]: configure })
        this._key = key


    }
    /**
     * 
     * @param {import("./protocol").EngineConfigure} datas 
     */
    set(datas) {
        super.set(this._key, datas)
    }
    get() {
        return super.get(this._key)
    }

}

module.exports = { EngineConfigureRepositry, DEFAULT_ENGINE_CONFIGURE }