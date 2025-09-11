const { RepositryContext } = require("../../repositry/base.cjs")

/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得
 * @property {function(Object): Function} enterSubworkflow - サブワークフローに入る
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻る
 * @property {function(Object): Function} back - 前の状態に戻る
 */


class Workflow {
    /**
     * 
     * @param {any} configure
     * @param {RepositryContext} context 
     * @returns  {import("../protocol").ApplyResponse}
     */
    applyConfigure(configure, context) {

    }
    /**
    * 
    * @param {int} data
    * @param {RepositryContext} context 
    *  
    */
    addWorkflowUnit(name, data, unitId, context) {

    }

    back() {

    }
    backAll() {

    }
    exec() {

    }

}