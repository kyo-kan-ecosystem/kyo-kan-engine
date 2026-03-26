

class SequenceRunner {
    constructor(dispatcher, context, request, enterMode = 'enter') {
        this.dispatcher = dispatcher
        this.context = context
        this.request = request
        this.run = this.run.bind(this)
        this.enterMode = enterMode





    }
    /**
     * 
     * @param {import("./protocol").ModeAndContext[]?} modeAndContexts 
     */
    run(modeAndContexts = null) {
        const _modeAndContexts = modeAndContexts || [{ mode: this.enterMode }]
        for (const modeAndContext of _modeAndContexts) {
            if (modeAndContext === false) {
                continue

            }


            const context = modeAndContext?.context || this.context
            const mode = modeAndContext?.mode || context.getMode()

            if (context === this.context) {
                const prom = this.dispatcher[mode](this.request, this.context)
                prom.then(this.run)
                continue
            }
            // @ts-ignore
            const runner = new this.constructor(this.dispatcher, context, this.request)
            runner.run([modeAndContext])



        }





    }

}

module.exports = { SequenceRunner }