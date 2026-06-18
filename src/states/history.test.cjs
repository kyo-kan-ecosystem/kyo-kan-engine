// @ts-ignore
const { StateHistory } = require('./history.cjs')
/**
 * @type {StateHistory}
*/
let history = new StateHistory()
// @ts-ignore
beforeEach(function () {
    history = new StateHistory()
})
// @ts-ignore
describe('about getStepNearestWait', function () {

    // @ts-ignore
    it('should get valid step when logs has same depth', function () {
        history.forward({
            controlls: {
                executeMode: 'wait'
            }
        }, 0)
        history.forward({
            controlls: {
                executeMode: 'go'
            }
        }, 0)

        const backResult = history.getStepNearestWait()


    })

}


)