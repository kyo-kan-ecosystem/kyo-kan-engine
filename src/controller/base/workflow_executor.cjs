/**
 * @typedef {import("../../sequence/protocol").ExecuteMode} executeMode
*/




/**
 * 
 * @typedef {import("../protocol").State} State
 * @typedef {Object} ExecutionResult
 * @property {State} state - 実行後の状態
 * @property {Array} response_units - レスポンス単位の配列
 */

/**
 * @typedef {Object} States
 * @property {function(State): void} update - 状態を更新する関数
 */

/**
 * @typedef {Object} Workflow
 * @property {function(Object): Function} getExecuteFunction - 実行関数を取得 
 * @property {function(Object): Function} returnFromSubworkflow - サブワークフローから戻った時の処理
 * @property {function(Object): Function} back - 前の状態に戻る
 * @property {function(Object): Function} returnAsReset - リセットして戻った時の処理
 */

/**
 * @typedef {import("../../workflow/context.cjs").WorkflowsContext} Workflows
 * 
 * 
 */



/**
 * @typedef {function(*, import('../../context/index.cjs').Context): Promise<ExecutionResult>} ExecuteFunction
 */

class Cursor {
    constructor() {
        this.stack = [];
        this.index = -1;
        this.length = 0;

    }
    push(executeFunc, configure) {
        this.stack.push([executeFunc, configure]);
        this.index++;
        this.length++;

    }
    step() {
        this.index++;
        return this.index < this.length;
    }
    get() {
        return this.stack[this.index];
    }




}

/**
 * ワークフローを実行する関数
 * @param {*} request - リクエストオブジェクト
 * @param {import('../../context/index.cjs').Context} context - コンテキストオブジェクト
 * @returns {Promise<{state: State, responses: Array}>} 実行結果
 */
async function executeWorkflow(request, context) {

    const { workflow: firstWorkflow, configure: firstConfigure } = context.workflows.getWorkflow();
    const firstFunc = firstWorkflow.getExecuteFunction(context);
    /** @type {Array<[ExecuteFunction, *]>} */
    const funcsArray = [[firstFunc, firstConfigure]];
    let _request = request

    /** @type {Array} */
    let responses = [];

    while (funcsArray.length > 0) {
        // 関数を一つ取り出す
        const currentFunc = funcsArray.pop();

        // 関数を非同期実行
        const { state, response_units } = await currentFunc(_request, context);

        // response_unitsとresponsesを結合
        responses = responses.concat(response_units);
        context.states.now.update(state);


        // stateのmodeによって分岐
        switch (state.mode) {
            case 'wait':

                return { state, responses };

            case 'go':
                const { plugin, configure } = context.workflows.getWorkflow();
                const goExecuteFunc = plugin.getExecuteFunction(configure, context);
                funcsArray.push(goExecuteFunc);
                break;

            case 'goSub':
                context.goSub();
                const subExecuteFunc = context.workflows.getWorkflow().enterWorkflow(context);


                funcsArray.push(subExecuteFunc);
                break;

            case 'end':
                const isTopOnEnd = context.endSub();
                if (!isTopOnEnd) {
                    return { state, responses };
                }
                const superWorkflowOnEnd = context.workflows.getWorkflow();
                const superExecuteFuncOnEnd = superWorkflowOnEnd.returnFromSubworkflow(context);
                funcsArray.push(superExecuteFuncOnEnd);
                break;

            case 'back':
                _request = context.back()
                const backWorkflow = context.workflows.getWorkflow();
                const backExecuteFunc = backWorkflow.back(context);
                funcsArray.push(backExecuteFunc);
                break;

            case 'rewindWorkflow':
                _request = context.reset();
                const resetWorkflow = context.workflows.getWorkflow();
                const resetExecuteFunc = resetWorkflow.resetBack(context);
                funcsArray.push(resetExecuteFunc);
                break;
            case "rewindReturn":
                const isTopOnRewindReturn = context.endSub();
                if (!isTopOnRewindReturn) {
                    return { state, responses };
                }
                const superWorkflowOnResetReturn = context.workflows.getWorkflow();
                const executeFuncOnResetReturn = superWorkflowOnResetReturn.returnAsReset(context);
                funcsArray.push(executeFuncOnResetReturn);
                break;

            default:
                throw new Error(`Unknown mode: ${state.mode}`);
        }
    }

    // funcsArrayが空になった場合（通常は到達しない）
    return { state: null, responses };
}

module.exports = { executeWorkflow }