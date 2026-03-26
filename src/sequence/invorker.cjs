import { SequenceDispatcherBase } from "./dispatcher.cjs";
import { SequenceRunner } from "./runner.cjs";

function invokeSequence(request, context, rennerClass = SequenceRunner, dispatcherClass = SequenceDispatcherBase, enterMode = 'enter') {
    const dispatcher = new dispatcherClass()
    const runner = new rennerClass(dispatcher, context, request, enterMode)
    runner.run()
}

module.exports = { invokeSequence }



