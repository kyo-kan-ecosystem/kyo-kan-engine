



/**
 * @abstract
 * @type
 */
class AbstractDispatcher {
    /**
     * 
     * @param {*} context 
     *
     */
    execute(request, context) {

    }


    wait(request, context, state, response = null) {

    }


    go(request, context, state, repsponse) {

    }

    goSub(request, context, state, repsponse) {

    }
    end(request, context, state, repsponse) {

    }
    back(request, context, state, repsponse) {

    }
    reset(request, context, state, repsponse) {

    }


    rewindWorkflow(request, context, state, repsponse) {

    }



    rewindReturn(request, context, state, response) {

    }



}




module.exports = { AbstractDispatcher }
