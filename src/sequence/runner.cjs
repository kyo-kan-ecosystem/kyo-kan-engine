
const { SingleEvent } = require("../util/single_event.cjs")

/**
 *
 */
class SequenceRunner {
    /**
     * @type {import("./protocol").ProcessCounter}
     */
    _processPathCounter

    /**
     * @type {import("../util/single_event.cjs").SingleEvent<(request:any, context:any)=>void>}
     */
    _processEndEvent


    /**
     * @type {any[]}
     */
    _contexts

    /**
     * @type { import("../context/index.cjs").Context<any, any> }
     * */

    _context

    /**
     * 
     * @param {*} dispatcher 
     * @param {import("../context/index.cjs").Context<any, any>} context 
     * @param {*} request 
     * @param {*} enterMode
     * @param {import("./protocol").ProcessCounter?} processCounter
     * @param {import("../util/single_event.cjs").SingleEvent<(request:any, contexts:any[])=>void>} processEndEvent
     * @param {any[]?} contexts    
     */
    constructor(dispatcher, context, request, processEndEvent, contexts = null, processCounter = null, enterMode = 'enter') {
        this.dispatcher = dispatcher
        this._context = context
        this.request = request
        this.run = this.run.bind(this)
        this.enterMode = enterMode
        this._processEndEvent = processEndEvent
        this._processPathCounter = processCounter || { n: 0 }
        this._contexts = contexts || [this._context]




    }
    /**
     * 
     * @param {import("./protocol").StepResult} modeAndContext 
     */
    run(modeAndContext = null) {


        if (modeAndContext === false) {
            this._processPathCounter.n--
        }

        else {
            /**
             * @type {import("./protocol").StepResult}
             */
            const _modeAndContext = modeAndContext || { mode: this.enterMode }
            /**
             * @type {import("../context/index.cjs").Context<any, any>}
             */
            const context = _modeAndContext.context || this._context
            const executeMode = _modeAndContext.mode || context.states.getExecuteMode()

            if (context === this._context) {
                this._processPathCounter.n++
                const proms = this.dispatcher[executeMode].call(this.request, this._context)
                for (const prom of proms) {
                    prom.then(this.run)
                }

            }
            else {
                this._contexts.push(context)
                // @ts-ignore
                const runner = new this.constructor(this.dispatcher, context, this.request, this._processEndEvent, this._contexts, this._processPathCounter, this.enterMode)
                runner.run(modeAndContext)
            }
        }




        if (this._processPathCounter.n === 0) {
            this._processEndEvent.emit(this.request, this._contexts)

        }





    }

}

module.exports = { SequenceRunner }