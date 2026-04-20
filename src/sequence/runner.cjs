
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
     * @param {import("./protocol").ExecuteMode} [startMode=start]
     * @param {import("./protocol").ProcessCounter?} processCounter
     * @param {import("../util/single_event.cjs").SingleEvent<(request:any, contexts:any[])=>void>} processEndEvent
     * @param {any[]?} contexts    
     */
    constructor(dispatcher, context, request, processEndEvent, contexts = null, processCounter = null, startMode = 'start') {
        this.dispatcher = dispatcher
        this._context = context
        this._request = request
        this.run = this.run.bind(this)
        this.startMode = startMode
        this._processEndEvent = processEndEvent
        this._processPathCounter = processCounter || { n: 0 }
        this._contexts = contexts || [this._context]




    }
    /**
     * 
     * @param {import("./protocol").StepResult?} stepResult 
     */
    run(stepResult = null) {


        if (stepResult === false) {
            this._processPathCounter.n--
        }

        else {
            /**
          
            /**
             * @type {import("../context/index.cjs").Context<any, any>}
             */
            const context = stepResult?.context || this._context
            let executeMode = this.startMode
            if (this._context.states.isStart() === false) {
                // @ts-ignore
                executeMode = context.states.controll.getExecuteMode()

            }



            if (context === this._context) {
                this._processPathCounter.n++
                const proms = this.dispatcher[executeMode].call(this._request, this._context)
                for (const prom of proms) {
                    prom.then(this.run)
                }

            }
            else {
                this._contexts.push(context)
                // @ts-ignore
                const runner = new this.constructor(this.dispatcher, context, this._request, this._processEndEvent, this._contexts, this._processPathCounter, this.startMode)
                runner.run(stepResult)
            }
        }




        if (this._processPathCounter.n === 0) {
            this._processEndEvent.emit(this._request, this._contexts)

        }





    }

}

module.exports = { SequenceRunner }