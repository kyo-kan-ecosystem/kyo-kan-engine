const { MapedHistoryDeepEqual } = require("../history/maped_history.cjs");
/**
 * @extends MapedHistoryDeepEqual<import("./protocol").StateType>
 */
class StateHistory extends MapedHistoryDeepEqual {


    getStepNearestWait() {

        let backStep = 0
        let entry = this.getBackLog(backStep)
        if (entry === false) {
            return false
        }
        const targetDepth = entry.depth


        while (entry !== false) {
            backStep++

            if (entry.log.controlls?.executeMode === 'wait' && backStep > 1 && entry.depth <= targetDepth) {
                entry = this.getBackLog(backStep)
                if (entry === false) {
                    return false
                }
                return backStep

            }
            entry = this.getBackLog(backStep)



        }
        return false


    }
    getStepOfStart() {

        let backStep = 0
        let entry = this.getBackLog(backStep)
        let waitStep = -1


        if (entry === false) {
            return false
        }
        const targetDepth = entry.depth

        while (entry !== false) {

            if ((entry.log.controlls?.executeMode === 'goSub' && entry.depth < targetDepth) || (entry.log.controlls?.executeMode === 'start' && entry.depth === 0)) {

                if (waitStep < 0) {
                    return false
                }
                return waitStep


            }

            if (entry.log.controlls?.executeMode === 'wait') {
                waitStep = backStep

            }

            backStep++
            entry = this.getBackLog(backStep)



        }

        return false


    }



}

module.exports = { StateHistory }    