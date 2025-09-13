/**
 * @typedef {import("../protocol").executeMode} executeMode
*/

/**
 * @typedef {import("../protocol").State} State
 * 
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
 */

/**
 * @typedef {Object} Workflows
 * @property {function(): Workflow} getCurrentWorkflow - 現在のワークフローを取得
 * 
 */

/**
 * @typedef {Object} Context
 * @property {States} states - 状態管理オブジェクト
 * @property {Workflows} workflows - ワークフロー管理オブジェクト
 * @property {function(): void} goSub - サブルーチンに移行する関数
 * @property {function(): boolean} endSub - サブルーチンを終了する関数
 * @property {function(): void} reset - リセット関数
 */

/**
 * @typedef {function(*, Context): Promise<ExecutionResult>} ExecuteFunction
 */

/**
 * ワークフローを実行する関数
 * @param {*} request - リクエストオブジェクト
 * @param {ExecuteFunction} firstFunc - 最初に実行する関数
 * @param {Context} context - コンテキストオブジェクト
 * @returns {Promise<{state: State, responses: Array}>} 実行結果
 */
async function executeWorkflow(request, firstFunc, context) {
    /** @type {Array<ExecuteFunction>} */
    const funcsArray = [firstFunc];

    /** @type {Array} */
    let responses = [];

    while (funcsArray.length > 0) {
        // 関数を一つ取り出す
        const currentFunc = funcsArray.pop();

        // 関数を非同期実行
        const { state, response_units } = await currentFunc(request, context);

        // response_unitsとresponsesを結合
        responses = responses.concat(response_units);
        context.states.update(state);

        // stateのmodeによって分岐
        switch (state.mode) {
            case 'wait':

                return { state, responses };

            case 'go':
                const goWorkflow = context.workflows.getCurrentWorkflow();
                const goExecuteFunc = goWorkflow.getExecuteFunction(context);
                funcsArray.push(goExecuteFunc);
                break;

            case 'goSub':

                context.goSub();
                const subWorkflow = context.workflows.getSubworkflow();
                const subExecuteFunc = subWorkflow.enterSubworkflow(context);
                funcsArray.push(subExecuteFunc);
                break;

            case 'end':
                const flag = context.endSub();
                if (!flag) {
                    return { state, responses };
                }
                const superWorkflow = context.workflows.getCurrentWorkflow();
                const superExecuteFunc = superWorkflow.returnFromSubworkflow(context);
                funcsArray.push(superExecuteFunc);
                break;

            case 'back':

                const backWorkflow = context.workflows.getCurrentWorkflow();
                const backExecuteFunc = backWorkflow.back(context);
                funcsArray.push(backExecuteFunc);
                break;

            case 'resetBack':
                context.reset();
                const resetWorkflow = context.workflows.getCurrentWorkflow();
                const resetExecuteFunc = resetWorkflow.enterSubworkflow(context);
                funcsArray.push(resetExecuteFunc);
                break;

            default:
                throw new Error(`Unknown mode: ${state.mode}`);
        }
    }

    // funcsArrayが空になった場合（通常は到達しない）
    return { state: null, responses };
}

module.exports = { executeWorkflow }