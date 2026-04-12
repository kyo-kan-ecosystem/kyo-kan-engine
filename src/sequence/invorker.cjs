import { SequenceDispatcherBase } from "./dispatcher.cjs";
import { SequenceRunner } from "./runner.cjs";

/**
 * @param {any} request
 * @param {import("../context/index.cjs").Context<any, any>} context
 * @param {import("../util/single_event.cjs").SingleEvent<(request: any, contexts: any[]) => void>} processEndEvent
 */
function invokeSequence(request, context, processEndEvent, runnerClass = SequenceRunner, dispatcherClass = SequenceDispatcherBase, enterMode = 'enter') {
    const dispatcher = new dispatcherClass()
    const runner = new runnerClass(dispatcher, context, request, processEndEvent, null, null, enterMode)
    runner.run()
}

// @ts-ignore
module.exports = { invokeSequence }



