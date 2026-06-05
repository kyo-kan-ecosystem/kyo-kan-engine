
class CopyClass {
    /**
     * 
     * @param {*} targets 
     * @returns 
     */
    dispatchAndCopy(targets) {
        if (Array.isArray(targets) === true) {
            return this.copyArray(targets)
        }
        if (targets instanceof Date) {
            return new Date(targets)

        }
        if (typeof targets !== 'object' || targets === null || targets instanceof String) {
            return targets

        }

        return this.copyObject(targets)


    }
    /**
     * @param {Array<any>} targets
     */
    copyArray(targets) {

        const result = []
        for (let index = 0; index < targets.length; index++) {


            result.push(this.dispatchAndCopy(targets[index]))


        }
        return targets

    }
    /**
     * 
     * @param {Object<string, any>} targets 
     */
    copyObject(targets) {
        /**
         * @type {Object<string, any>}
         */
        const result = {}
        for (const key in targets) {


            const element = targets[key]
            result[key] = this.dispatchAndCopy(element)

        }
        return result

    }


}
/**
 * @template T
 * @param {T} targets 
 * @param {*} copyClass 
 * @returns T
 */
function deepcopy(targets, copyClass = CopyClass) {
    /**
     * @template T
     * @type {{dispatchAndCopy:(targets:T)=>T}}
     */
    const copyObj = new copyClass()
    return copyObj.dispatchAndCopy(targets)





}

module.exports = { deepcopy, CopyClass }