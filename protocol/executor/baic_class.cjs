
const merge = require("deepmerge")

/**
 * @typedef {import("./protocol").WithGetSubworkflow} WithGetSubworkflow
 * @implements {WithGetSubworkflow}  
 * */
class BasicWithGetSubworkflowClass {



    /**
     * @abstract
     * @type {import("./protocol").SubWorkflowConfigures}
     */

    // @ts-ignore
    _subworkflows

    /**
     * 
     * @param {import("./protocol").BasicOptions} options
     * 
     */
    getSubworkflow(options) {
        const subWorkflowConfigures = options.subworkflows || {}
        /**
        * @type {import("./protocol").SubWorkflowConfigures}
        */
        const res = {}
        for (const key in options.subworkflows || {}) {


            const element = subWorkflowConfigures[key];

            const base = this._subworkflows[key]
            // @ts-ignore
            res[key] = deepmerge(base, element)


        }
        return res
    }

}

module.exports = { BasicWithGetSubworkflowClass }





