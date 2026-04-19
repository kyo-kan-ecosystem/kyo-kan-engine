



/**
 * @abstract
 * */
class AbstractDispatcher {

    /**
     * @abstract
     * @param {*} context
     * @param {any} request
     */
    start(request, context) {

    }

    /**
     * @abstract
     * @param {*} context
     * @param {any} request
     */
    resume(request, context) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    wait(request, context) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    go(request, context) {

    }

    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    goSub(request, context) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    returnFromSub(request, context) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    end(request, context) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    back(request, context) {

    }
    /**
     * @param {any} request
     * @param {any} context
     */
    reset(request, context) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    rewindWorkflow(request, context) {

    }



    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    rewindReturn(request, context) {

    }



}




module.exports = { AbstractDispatcher }
