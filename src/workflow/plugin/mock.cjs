const { deepcopy } = require("../../util/deepcopy.cjs")
const { AbstractWorkflow } = require("./protocol.class.cjs")


const calledsInit = {
    configure: undefined,
    resolver: undefined
}

/**
 * @type {Partial<calledsInit>}
 */
let called
const mockValueInit = {
    executorIDs: []
}
/**
 * @type {mockValueInit?}
 */
let mockValue

/**
 * @typedef {{id:any, configure:{plugin:any, options:any}, }}
 */

/**
 *
 */
const resoveValueInit = {
    executors: [{}]
}

function reset() {
    called = deepcopy(calledsInit)
    mockValue = deepcopy(mockValueInit)

}
function getCalled() {
    return called
}
class MockWorkflow extends AbstractWorkflow {
    getMemberExecutors(configure, resolver) {

    }
}