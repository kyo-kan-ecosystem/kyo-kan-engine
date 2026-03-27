import { SequenceDispatcherBase } from "./dispatcher.cjs";
import { SequenceRunner } from "./runner.cjs";

function invokeSequence(request, context, processEndEvent, runnerClass = SequenceRunner, dispatcherClass = SequenceDispatcherBase, enterMode = 'enter') {
    const dispatcher = new dispatcherClass()
    const runner = new runnerClass(dispatcher, context, request, processEndEvent, null, null, enterMode)
    runner.run()
}

module.exports = { invokeSequence }



