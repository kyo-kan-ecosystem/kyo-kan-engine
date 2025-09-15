const { MapedHistory } = require("./maped_history.cjs");

class RequestHistory extends MapedHistory {
    addNewLog(request, branchId) {

        const branchHeader = this.getBranchHead(branchId, false);
        if (branchHeader != request) {
            const id = super.addNewLog(branchId, request)



        }
        else {
            super.addNonUpdateLog(branchId)

        }



    }
}

module.exports = { RequestHistory }    