const { SequenceDispatcherBase } = require("./dispatcher.cjs")
const { SequenceRunner } = require("./runner.cjs")

/**
 * @param {any} request
 * @param {import("../context/class.cjs").Context<any, any>} context
 * @param {import("../util/single_event.cjs").SingleEvent<(request: any, contexts: any[]) => void>} processEndEvent
 */
function invokeSequence(request, context, processEndEvent, runnerClass = SequenceRunner, dispatcherClass = SequenceDispatcherBase, enterMode = 'enter') {
    const dispatcher = new dispatcherClass()
    // @ts-ignore
    const runner = new runnerClass(dispatcher, context, request, processEndEvent, null, null)
    return runner.run()
}

// @ts-ignore
module.exports = { invokeSequence }



