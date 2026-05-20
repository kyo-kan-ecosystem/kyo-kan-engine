



/**
 * @abstract
 * */
class AbstractDispatcher {

    /**
     * @abstract
     * @param {*} context
     * @param {any} request
     */
    start(context, request) {

    }

    /**
     * @abstract
     * @param {*} context
     * @param {any} request
     */
    resume(context, request) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    wait(context, request) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    go(context, request) {

    }

    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    goSub(context, request) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    returnFromSub(context, request) {

    }

    /**
     * @abstract
     * @param {any} context
     * @param {any} request
     */
    callback(context, request) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    end(context, request) {

    }
    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    back(context, request) {

    }
    /**
     * @param {any} request
     * @param {any} context
     */
    reset(context, request) {

    }


    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    rewindWorkflow(context, request) {

    }



    /**
     * @abstract
     * @param {any} request
     * @param {any} context
     */
    rewindReturn(context, request) {

    }



}




module.exports = { AbstractDispatcher }
