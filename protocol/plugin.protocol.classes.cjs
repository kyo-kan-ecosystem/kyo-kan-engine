class PluginBaseClass {
    /**
     * 
     * @returns {{[k in string]: import("./plugin.protocol.d.ts").SubworkflowDefinition}} 
     */
    getSubworkflows() {
        return {}
    }

}

module.exports = { PluginBaseClass }