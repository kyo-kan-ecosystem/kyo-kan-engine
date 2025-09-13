



/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得
 * @property {function(Object): Function} getSubworkflow - サブワークフローに入る
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻る
 * @property {function(Object): Function} back - 前の状態に戻る
 */

const { States } = require("./state/states.cjs");
const { Workflows } = require("./workflows.cjs");



/**
 * @typedef {Object} Context
 * @property {States} states - 状態管理オブジェクト
 * @property {Workflows} workflows - ワークフロー管理オブジェクト
 * @property {function(): void} goSub - サブルーチンに移行する関数
 * @property {function(): boolean} endSub - サブルーチンを終了する関数
 * @property {function(): void} reset - リセット関数
 */

/**
 * @typedef {{
 *      states:typeof States
 *      workflows:typeof Workflows
 *       
 * }} classes
 */

/



class Context {
    /**
     * @param {BasicData? | false} [initData={}] 
     * @param {RepositryClasses?} repositryClasses 
     */
    constructor() {

        this.repositries = repositries
        this.states = this.states


    }
    /**
     * 
     * @returns {{workflows:any, executors:any}}
     */
    getPluginMap() {

        return { workflows: this.plugins.workflows.getSerializeDatas(), executors: this.plugins.executors.getSerializeDatas }
    }
    getWorkflowConfigure() {
        return { workflows: this.workflows.getSerializeDatas(), worknodes: this.worknodes.getSerializeDatas() }
    }
    setCalleId(calleId) {
        this.workflows.calleId = calleId

    }

    setState(state) {

    }
    clone() {
        /**
         * @typedef {keyof BasicFunctionContext} _keys
         * 
         */
        const cloneKey = 'workflows';
        const ret = {}
        for (const key in this) {
            if (cloneKey == key) {
                const element = this[key]
                ret[key] = element.clone()

            }
            else {
                ret[key] = this[key]
            }

        }
        return ret

    }





}


module.exports = { Context }