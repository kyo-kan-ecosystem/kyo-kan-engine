// @ts-nocheck
const merge = require("deepmerge")

/**
 * @typedef {import("./protocol").WithGetSubworkflow} WithGetSubworkflow
 * @implements {WithGetSubworkflow}  
 * */
class BasicWithGetSubworkflowClass {


    // @ts-ignore
    /**
     * @type {import("./protocol").SubWorkflowConfigures}
     */
    _subworkflows

    /**
     * 
     * @param {import("./protocol").BasicConfigure} configure
     * 
     */
    getSubworkflow(configure) {
        const subWorkflowConfigures = configure.subwwokflows || {}
        /**
        * @type {import("./protocol").SubWorkflowConfigures}
        */
        const res = {}
        for (const key in configure.subwwokflows || {}) {


            const element = subWorkflowConfigures[key];

            const base = this._subworkflows[key]
            // @ts-ignore
            res[key] = deepmerge(base, element)


        }
        return res
    }

}

module.exports = { BasicWithGetSubworkflowClass }





