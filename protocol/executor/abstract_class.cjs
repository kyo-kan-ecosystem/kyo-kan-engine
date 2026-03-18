class AbstractExecutorPlugin {
    /**
     * 
     * @returns {{
     *   [k in string]: import("./protocol").SubworkflowDefinition;}}
     *
     */
    getSubworkflows(configure) {
        return {}
    }

}

module.exports = { AbstractExecutorPlugin }