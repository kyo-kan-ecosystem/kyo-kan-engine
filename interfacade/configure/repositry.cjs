const { DEFAULT_CONFIGURE } = require("./defaults.cjs")


class InterfacadeConfigRepositryClass {
    /**
     * 
     * @type {import("./protocol").InterfacadeConfigure} defaultConfigure 
     */
    configure
    constructor(defaultConfigure = DEFAULT_CONFIGURE) {
        this.configure = defaultConfigure

    }


}

const InterfacadeConfigRepositry = new InterfacadeConfigRepositryClass()

module.exports = { InterfacadeConfigRepositry, InterfacadeConfigRepositryClass }