const { SingleEvent } = require("../util/single_event.cjs")

/**
 *
 */
class SequenceRunner {
    /**
     * @type {import("./protocol").ProcessCounter}
     */
    _processCounter

    /**
     * @type {import("../util/single_event.cjs").SingleEvent<(request, context)=>void>}
     */
    _processEndEvent


    /**
     * @type {any[]}
     */
    _contexts

    /**
     * 
     * @param {*} dispatcher 
     * @param {*} context 
     * @param {*} request 
     * @param {*} enterMode
     * @param {import("./protocol").ProcessCounter?} processCounter
     * @param {import("../util/single_event.cjs").SingleEvent<(request:any, contexts:any[])=>void>} processEndEvent
     * @param {any[]?} contexts    
     */
    constructor(dispatcher, context, request, processEndEvent, contexts = null, processCounter = null, enterMode = 'enter') {
        this.dispatcher = dispatcher
        this.context = context
        this.request = request
        this.run = this.run.bind(this)
        this.enterMode = enterMode
        this._processEndEvent = processEndEvent
        this._processCounter = processCounter || { n: 0 }
        this._contexts = contexts || [this.context]






    }
    /**
     * 
     * @param {import("./protocol").ModeAndContext[]?} modeAndContexts 
     */
    run(modeAndContexts = null) {
        const _modeAndContexts = modeAndContexts || [{ mode: this.enterMode }]
        for (const modeAndContext of _modeAndContexts) {
            if (modeAndContext === false) {
                this._processCounter.n--

                continue

            }


            const context = modeAndContext?.context || this.context
            const mode = modeAndContext?.mode || context.getMode()

            if (context === this.context) {
                this._processCounter.n++
                const prom = this.dispatcher[mode](this.request, this.context)
                prom.then(this.run)

            }
            else {
                this._contexts.push(context)
                // @ts-ignore
                const runner = new this.constructor(this.dispatcher, context, this.request, this._processEndEvent, this._contexts, this._processCounter, this.enterMode)
                runner.run([modeAndContext])
            }




        }
        if (this._processCounter.n === 0) {
            this._processEndEvent.emit(this.request, this._contexts)

        }





    }

}

module.exports = { SequenceRunner }