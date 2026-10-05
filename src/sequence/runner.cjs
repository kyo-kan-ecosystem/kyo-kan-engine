
const { isVoid } = require("../util/is_void.cjs")
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
     * @param {{[k in string]:import("./protocol").DispatchFunction}} dispatcher 
     * @param {import("../context/index.cjs").Context<any, any>} context 
     * @param {*} request 
     * @param {import("./protocol").ProcessCounter?} processCounter
     * @param {import("../util/single_event.cjs").SingleEvent<(request:any, contexts:any[])=>void>} processEndEvent
     * @param {any[]?} contexts    
     */
    constructor(dispatcher, context, request, processEndEvent, contexts = null, processCounter = null) {
        this.dispatcher = dispatcher
        this._context = context
        this._request = request
        this.run = this.run.bind(this)
        this._processPromises = this._processPromises.bind(this)

        this._processEndEvent = processEndEvent
        this._processPathCounter = processCounter || { n: 0 }
        this._contexts = contexts || [this._context]




    }
    /**
     * 
     * @param {import("./protocol").StepResult?} _context 
     */
    run(_context = null) {
        const context = isVoid(_context) ? this._context : _context


        if (_context === false) {
            this._processPathCounter.n--
        }

        else {

            // @ts-ignore
            const executeMode = context.states.controll.getExecuteMode()
            if (_context === this._context) {

                // @ts-ignore
                const maybeProms = this.dispatcher[executeMode].call(this.dispatcher, this._context, this._request)
                if (maybeProms instanceof Promise) {
                    maybeProms.then(this._processPromises)
                }
                else {
                    this._processPromises(maybeProms)
                }


            }
            else {
                this._processPathCounter.n++
                this._contexts.push(_context)
                // @ts-ignore
                const runner = new this.constructor(this.dispatcher, _context, this._request, this._processEndEvent, this._contexts, this._processPathCounter, this.startMode, this.resumeMode)
                runner.run(_context)
            }
        }




        if (this._processPathCounter.n === 0) {
            this._processEndEvent.emit(this._request, this._contexts)

        }





    }
    /**
     * 
     * @param {Promise<any>[]} proms 
     */
    _processPromises(proms) {


        for (const prom of proms) {
            prom.then(this.run)
        }
    }

}

module.exports = { SequenceRunner }