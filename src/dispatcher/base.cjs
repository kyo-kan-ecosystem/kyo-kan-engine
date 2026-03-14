const { AbstractCallDispatcher } = require("../../protocol/dispatcher.cjs/index.js")

class CallDispatcherBase extends AbstractCallDispatcher {
    /**
     * @abstract
     * @param {import('../../protocol/context').Context<any, any>} context
     * @param {import('../../protocol/plugin.protocol.d.ts').AbstractPlugin}  plugin
     */

    dispatch(context, plugin) {

    }

}
case 'wait':

return { state, responses };

            case 'go':
const { plugin, configure } = context.workflows.getCurrentWorkflow();
const goExecuteFunc = plugin.getExecuteFunction(configure, context);
funcsArray.push(goExecuteFunc);
break;

            case 'goSub':
context.goSub();
const subExecuteFunc = context.workflows.getCurrentWorkflow().enterWorkflow(context);


funcsArray.push(subExecuteFunc);
break;

            case 'end':
const isTopOnEnd = context.endSub();
if (!isTopOnEnd) {
    return { state, responses };
}
const superWorkflowOnEnd = context.workflows.getCurrentWorkflow();
const superExecuteFuncOnEnd = superWorkflowOnEnd.returnFromSubworkflow(context);
funcsArray.push(superExecuteFuncOnEnd);
break;

            case 'back':
_request = context.back()
const backWorkflow = context.workflows.getCurrentWorkflow();
const backExecuteFunc = backWorkflow.back(context);
funcsArray.push(backExecuteFunc);
break;

            case 'rewindWorkflow':
_request = context.reset();
const resetWorkflow = context.workflows.getCurrentWorkflow();
const resetExecuteFunc = resetWorkflow.resetBack(context);
funcsArray.push(resetExecuteFunc);
break;
            case "rewindReturn":
const isTopOnRewindReturn = context.endSub();
if (!isTopOnRewindReturn) {
    return { state, responses };
}
const superWorkflowOnResetReturn = context.workflows.getCurrentWorkflow();
const executeFuncOnResetReturn = superWorkflowOnResetReturn.returnAsReset(context);
funcsArray.push(executeFuncOnResetReturn);
break;

            default:
throw new Error(`Unknown mode: ${state.mode}`);
        }
