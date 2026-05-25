const { MapedHistoryDeepEqual } = require("../history/maped_history.cjs");
/**
 * @extends MapedHistoryDeepEqual<import("./protocol").StateType>
 */
class StateHistory extends MapedHistoryDeepEqual {
    backToWait() {

        let backStep = 0
        let entry = this.getBackLog(backStep)
        while (entry !== false) {
            backStep++

            if (entry.log.controlls?.executeMode === 'wait') {
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

}

module.exports = { StateHistory }    