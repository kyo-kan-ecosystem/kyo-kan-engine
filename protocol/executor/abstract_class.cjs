
/**
 * @typedef {(a:string)=>string } t
 */


class AbstractExecutorPlugin {

    /**
     * @param {import("./protocol").ExecutorConfigure} configure 
     * @returns {{
     *   [k in string]:any}}
     *
     */
    getSubworkflows(configure) {
        return configure.subworkflows
    }



}

module.exports = { AbstractExecutorPlugin }