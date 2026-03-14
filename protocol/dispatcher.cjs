



/**
 * @abstract
 * @type
 */
class AbstractDispatcher {
    /**
     * 
     * @param {*} context 
     * @param {*} state 
     * @param {*} repsponse
     * @returns {Promise<any> | Array<Promise<any>> | false} 
     */
    execute(context, state, repsponse) {

    }


    wait(context, state, repsponse) {

    }


    go(context, state, repsponse) {

    }

    goSub(context, state, repsponse) {

    }
    end(context, state, repsponse) {

    }
    back(context, state, repsponse) {

    }
    reset(context, state, repsponse) {

    }


    rewindWorkflow(context, state, repsponse) {

    }



    rewindReturn(context, state) {

    }



}




module.exports = { AbstractDispatcher }
