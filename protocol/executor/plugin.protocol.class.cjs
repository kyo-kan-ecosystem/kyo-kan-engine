class AbstractExecutorPlugin {
    /**
     * 
     * @returns {{
     *   [k in string]: import("../plugin.protocol").SubworkflowDefinition;}}
     *
     */
    getSubworkflows() {
        return {}
    }

}

module.exports = { AbstractExecutorPlugin }