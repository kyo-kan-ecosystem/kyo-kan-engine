// @ts-ignore
const { expect } = require('chai');
// @ts-ignore
// @ts-ignore
const sinon = require('sinon');
const { MapedHistory, MapedHistoryDeepEqual } = require('./maped_history.cjs');

// @ts-ignore
describe('MapedHistory', function () {
    /**
     * @type {MapedHistory}
     */
    let history;

    // @ts-ignore
    beforeEach(function () {
        history = new MapedHistory();
    });

    // @ts-ignore
    describe('Constructor', function () {
        // @ts-ignore
        it('should initialize with empty logs and default branchId 0', function () {
            // @ts-ignore
            expect(history._logs).to.deep.equal({});
            // @ts-ignore
            expect(history._branchLogs).to.deep.equal({});
            // @ts-ignore
            expect(history._countRef).to.deep.equal({ branch: 1, history: 0 });
            // @ts-ignore
            expect(history._branchId).to.equal(0);
        });

        // @ts-ignore
        it('should initialize with provided data', function () {
            /**
             * @type {import('./protocol').SerializedHistoryData<any>}
             */
            const initData = {
                logs: { '0': { log: { a: 1 }, count: 1 } },
                branchLogs: { '0': [{ id: 0, depth: 0 }] },
                countRef: { branch: 1, history: 1 },
                reverseLinkMap: { 1: { branchId: 1, step: 1, isBranchOut: false } },
                linkedCounts: { '0': 1 },
                branchId: 0
            };
            // @ts-ignore
            const h = new MapedHistory(initData);
            // @ts-ignore
            expect(h._logs).to.deep.equal(initData.logs);
            // @ts-ignore
            expect(h._branchLogs).to.deep.equal(initData.branchLogs);
            // @ts-ignore
            expect(h._countRef).to.deep.equal(initData.countRef);
            // @ts-ignore
            expect(h._reverseLinkMap).to.deep.equal(initData.reverseLinkMap);
            // @ts-ignore
            expect(h._linkedCounts).to.deep.equal(initData.linkedCounts);
        });
    });

    // @ts-ignore
    describe('add / addNewLog', function () {
        // @ts-ignore
        it('should add a new log and update branch history', function () {
            const data = { message: 'hello' };
            const id = history.addNewLog(data, 0, 0);

            expect(id).to.equal(0);
            // @ts-ignore
            expect(history._countRef.history).to.equal(1);
            // @ts-ignore
            expect(history._logs[0]).to.deep.equal({ log: data, count: 1 });
            // @ts-ignore
            expect(history._branchLogs[0]).to.deep.equal([{ id: 0, depth: 0 }]);
        });

        // @ts-ignore
        it('should throw an error if branchId is not provided and not set', function () {
            history._branchId = null
            expect(function () { history.addNewLog({ a: 1 }, 0) }).to.throw('branchId  is not defined');
        });
    });

    // @ts-ignore
    describe('addNonUpdateLog', function () {
        // @ts-ignore
        it('should add a reference to an existing log', function () {
            const data = { message: 'initial' };
            const id = history.addNewLog(data, 0, 0);

            history.addNonUpdateLog(id, 1, 0);

            // @ts-ignore
            expect(history._countRef.history).to.equal(1); // Should not increment
            // @ts-ignore
            expect(history._logs[0].count).to.equal(2);
            // @ts-ignore
            expect(history._branchLogs[0]).to.deep.equal([
                { id: 0, depth: 0 },
                { id: 0, depth: 1 }
            ]);
        });

        // @ts-ignore
        it('should throw an error if branch does not exist', function () {
            expect(function () { history.addNonUpdateLog(0, 0, 99) }).to.throw('branchId 99 is not found');
        });
    });

    // @ts-ignore
    describe('forward', function () {
        // @ts-ignore
        it('should add a new log if branch is empty', function () {
            const data = { a: 1 };
            const id = history.forward(data, 0, 0);
            expect(id).to.equal(0);
            const head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal(data);
            // @ts-ignore
            expect(head.depth).to.equal(0);
        });

        // @ts-ignore
        it('should add a new log if data is different (reference check)', function () {
            const data1 = { 1: 'hello' };
            const data2 = { 2: 'world' };
            history.forward(data1, 0, 0);
            const id2 = history.forward(data2, 1, 0);

            expect(id2).to.equal(1);
            const head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal(data2);
            // @ts-ignore
            expect(head.depth).to.equal(1);
            // @ts-ignore
            expect(history._branchLogs[0].length).to.equal(2);
        });


    });

    // @ts-ignore
    describe('back', function () {
        // @ts-ignore
        beforeEach(function () {
            history.forward({ 'step': '1' }, 0, 0);
            history.forward({ 'step': '2' }, 1, 0);
        });

        // @ts-ignore
        it('should go back one step and remove log', function () {
            let head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal({ 'step': '2' });
            // @ts-ignore
            expect(head.depth).to.equal(1);

            const { removedLogItem, logExist } = history.back(0);

            expect(removedLogItem).to.deep.equal({ id: 1, depth: 1 });
            expect(logExist).to.be.true;
            head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal({ 'step': '1' });
            // @ts-ignore
            expect(head.depth).to.equal(0);
            // @ts-ignore
            expect(1 in history._logs).to.false// count is decremented
        });

        // @ts-ignore
        it('should delete log from _logs if count becomes 0', function () {
            // @ts-ignore
            expect(history._logs[1]).to.exist;
            history.back(0);
            // @ts-ignore
            expect(history._logs[1]).to.not.exist;
        });

        // @ts-ignore
        it('should handle multiple references correctly', function () {
            // Add a reference to 'step 1'
            history.forward('step 1', 2, 0);
            // @ts-ignore
            expect(history._logs[0].count).to.equal(1);

            // Go back from the 'step 1' reference
            history.back(0);
            // @ts-ignore
            expect(history._logs[0].count).to.equal(1); // count is 1
            // @ts-ignore
            expect(history._logs[0]).to.exist; // log should still exist

            // Go back from 'step 2'
            history.back(0);
            // @ts-ignore
            expect(history._logs[1]).to.not.exist;

            // Go back from the original 'step 1'
            history.back(0);
            // @ts-ignore
            expect(history._logs[0]).to.not.exist; // Now it should be deleted
        });

        // @ts-ignore
        it('should throw an error if trying to back on an empty branch', function () {
            history.back(0);
            history.back(0);
            expect(function () { history.back(0) }).to.throw('branchId 0 is not found');
        });
    });

    // @ts-ignore
    describe('fork', function () {
        /**
         * @type {MapedHistory}
         */
        let forkedHistory;

        // @ts-ignore
        beforeEach(function () {
            history.forward({ data: 'original' }, 0, 0);
            forkedHistory = history.fork(1); // Fork to new branch '1'
        });

        // @ts-ignore
        it('should create a new instance with a different branchId', function () {
            // @ts-ignore
            expect(forkedHistory).to.be.an.instanceof(MapedHistory);
            // @ts-ignore
            expect(forkedHistory._branchId).to.equal(1);
            // @ts-ignore
            expect(history._branchId).to.equal(0);
        });

        // @ts-ignore
        it('should share internal data structures by reference', function () {
            // @ts-ignore
            expect(forkedHistory._logs).to.equal(history._logs);
            // @ts-ignore
            expect(forkedHistory._branchLogs).to.equal(history._branchLogs);
            // @ts-ignore
            expect(forkedHistory._countRef).to.equal(history._countRef);
        });

        // @ts-ignore
        it('should reflect changes from the forked instance in the original', function () {
            // Add a log in the forked history
            // @ts-ignore
            forkedHistory.forward({ data: 'forked' }, 0); // Uses its branchId '1'

            // Check both histories
            // @ts-ignore
            expect(history._countRef.history).to.equal(2);
            // @ts-ignore
            expect(history._logs[1]).to.deep.equal({ log: { data: 'forked' }, count: 1 });
            // @ts-ignore
            expect(history._branchLogs[1]).to.deep.equal([{ id: 1, depth: 0 }]);

            // The original branch should be unaffected
            const head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal({ data: 'original' });
            // @ts-ignore
            expect(head.depth).to.equal(0);
        });

        // @ts-ignore
        it('should reflect changes from the original instance in the forked one', function () {
            // Add a log in the original history
            history.forward({ data: 'original_new' }, 1); // Uses its branchId '0'

            // Check both histories

            expect(forkedHistory._countRef.history).to.equal(2);
            // @ts-ignore
            expect(forkedHistory._logs[1]).to.deep.equal({ log: { data: 'original_new' }, count: 1 });

            // The forked branch should not exist yet in the shared logs
            // @ts-ignore
            expect(forkedHistory.getBranchHead(1, false)).to.be.null;
        });
    });

    // @ts-ignore
    describe('getSerializedData', function () {
        // @ts-ignore
        it('should return a deep copy of the data including branch links', function () {
            history.forward({ a: { b: 1 } }, 0, 0);
            const forked = history.fork(); // creates branch 1 from 0
            const serialized = history.getSerializedData();

            // Ensure they are not the same reference
            // @ts-ignore
            expect(serialized.logs).to.not.equal(history._logs);
            // @ts-ignore
            expect(serialized.branchLogs).to.not.equal(history._branchLogs);
            // @ts-ignore
            expect(serialized.countRef).to.not.equal(history._countRef);
            // @ts-ignore
            expect(serialized.reverseLinkMap).to.not.equal(history._reverseLinkMap);
            // @ts-ignore
            expect(serialized.linkedCounts).to.not.equal(history._linkedCounts);

            // Ensure values are the same
            // @ts-ignore
            expect(serialized.logs).to.deep.equal(history._logs);
            // @ts-ignore
            expect(serialized.branchLogs).to.deep.equal(history._branchLogs);
            // @ts-ignore
            expect(serialized.countRef).to.deep.equal(history._countRef);
            // @ts-ignore
            expect(serialized.reverseLinkMap).to.deep.equal(history._reverseLinkMap);
            // @ts-ignore
            expect(serialized.linkedCounts).to.deep.equal(history._linkedCounts);

            // Modify the copy and check if the original is unchanged
            // @ts-ignore
            serialized.logs[0].log.a.b = 99;
            // @ts-ignore
            serialized.branchLogs[0][0].id = 99;
            // @ts-ignore
            serialized.countRef.n = 99;
            // @ts-ignore
            serialized.reverseLinkMap[forked._branchId] = 99;
            // @ts-ignore
            serialized.linkedCounts[0] = 99;

            // @ts-ignore
            expect(history._logs[0].log.a.b).to.equal(1);
            // @ts-ignore
            expect(history._branchLogs[0][0].id).to.equal(0);
            // @ts-ignore
            expect(history._countRef.history).to.equal(1); // 0 for original log, 1 for branch
            /**
             * @type {import('./protocol').LinkItem}
             */
            const expectForReverceLinkMap = { step: 0, branchId: 0, isBranchOut: false }
            expect(history._reverseLinkMap[forked._branchId]).to.deep.equal(expectForReverceLinkMap);
            // @ts-ignore
            expect(history._linkedCounts[0]).to.equal(1);
        });
    });

    // @ts-ignore
    describe('Branching (fork, remove, counts)', function () {
        // @ts-ignore
        beforeEach(function () {
            history.setBranchId(0);
            history.forward('data 0', 0);
        });

        // @ts-ignore
        it('fork() should create a new branch linked to the parent', function () {
            // @ts-ignore
            const parentBranchId = history._branchId;
            expect(history.getLinkedCount(parentBranchId)).to.equal(0);

            const forkedHistory = history.fork(); // Fork without ID
            // @ts-ignore
            const newBranchId = forkedHistory._branchId;

            expect(newBranchId).to.not.equal(parentBranchId);
            // @ts-ignore
            expect(history.getReverseLinkedBranch(newBranchId).branchId).to.equal(parentBranchId);
            expect(history.getLinkedCount(parentBranchId)).to.equal(1);
        });

        // @ts-ignore
        it('removeBranch() should delete a branch and update parent link count', function () {
            // @ts-ignore
            const parentBranchId = history._branchId;
            const forkedHistory = history.fork();
            // @ts-ignore
            const forkedBranchId = forkedHistory._branchId;

            expect(history.getLinkedCount(parentBranchId)).to.equal(1);
            // @ts-ignore
            expect(history._branchLogs[forkedBranchId]).to.exist;
            // @ts-ignore
            expect(history._reverseLinkMap[forkedBranchId]).to.exist;

            history.removeBranch(forkedBranchId);

            expect(history.getLinkedCount(parentBranchId)).to.equal(0);
            // @ts-ignore
            expect(history._branchLogs[forkedBranchId]).to.not.exist;
            // @ts-ignore
            expect(history._reverseLinkMap[forkedBranchId]).to.not.exist;
        });

        // @ts-ignore
        it('getLinkedCount() should return 0 for branches with no children or non-existent branches', function () {
            expect(history.getLinkedCount(0)).to.equal(0); // No children yet
            const forked = history.fork();
            expect(history.getLinkedCount(0)).to.equal(1);
            // @ts-ignore
            expect(history.getLinkedCount(forked._branchId)).to.equal(0); // Forked branch has no children
            expect(history.getLinkedCount(999)).to.equal(0); // Non-existent branch
        });

        // @ts-ignore
        it('getReverseLinkedBranchId() should return the parent ID', function () {
            const forked = history.fork();
            /**
             * @type {import('./protocol').LinkItem}
             */
            const expected = { branchId: 0, step: 0, isBranchOut: false }
            expect(history.getReverseLinkedBranch(forked._branchId)).to.deep.equal(expected);

            expect(history.getReverseLinkedBranch(0)).to.be.undefined; // Root branch
        });
    });

    //@ts-ignore
    describe('getBackLog ', function () {
        // @ts-ignore
        describe('can back if past log exist', function () {
            // @ts-ignore
            it('should work if not forked', function () {


                history.forward('test1', 0)
                history.forward('test2', 0)
                history.forward('test3', 0)
                const backResult = history.getBackLog()
                /**
                 * @type {import('./protocol').BackResult}
                 */
                const expectedResult = { log: 'test2', branchId: history.getBranchId(), depth: 0 }
                expect(backResult).not.false
                expect(backResult).deep.equal(expectedResult)
            })
            // @ts-ignore
            it('should work if specific step set', function () {


                history.forward('test1', 0)
                history.forward('test2', 0)
                history.forward('test3', 0)
                const backResult = history.getBackLog(2)
                /**
                 * @type {import('./protocol').BackResult}
                 */
                const expectedResult = { log: 'test1', branchId: history.getBranchId(), depth: 0 }
                expect(backResult).not.to.be.false
                expect(backResult).deep.equal(expectedResult)
            })
            // @ts-ignore
            it('should handle forked', function () {


                history.forward('test1', 0)
                const forked = history.fork()
                forked.forward('test2', 0)
                forked.forward('test3', 0)
                const backResult = forked.getBackLog(2)
                /**
                 * @type {import('./protocol').BackResult}
                 */
                const expectedResult = { log: 'test1', branchId: forked.getBranchId(), depth: 0 }
                expect(backResult).not.to.be.false
                expect(backResult).deep.equal(expectedResult)
            })

        })


    })
});

// @ts-ignore
describe('MapedHistoryDeepEqual', function () {
    /**
     * @type {MapedHistoryDeepEqual}
     */
    let history;

    // @ts-ignore
    beforeEach(function () {
        history = new MapedHistoryDeepEqual();
    });

    // @ts-ignore
    it('addNewLog should return the new log ID', function () {
        const data = { message: 'test' };
        const id = history.addNewLog(data, 0, 0);
        expect(id).to.equal(0);
        expect(history.getBranchHeadId(0)).to.equal(0);
    });


    // @ts-ignore
    describe('forward with _checkEqual override', function () {
        // @ts-ignore
        it('should use deep equality for comparison', function () {
            const data1 = { user: { id: 1, name: 'A' } };
            const data2 = { user: { id: 1, name: 'A' } }; // Same value, different reference
            const data3 = { user: { id: 2, name: 'B' } };

            // 1. Add initial log
            const id1 = history.forward(data1, 0, 0);
            expect(id1).to.equal(0);
            // @ts-ignore
            expect(history._logs[0].count).to.equal(1);
            // @ts-ignore
            expect(history._branchLogs[0].length).to.equal(1);

            // 2. Forward with a deeply equal object
            const id2 = history.forward(data2, 1, 0);
            expect(id2).to.equal(id1); // Should be a non-update
            // @ts-ignore
            expect(history._logs[0].count).to.equal(2);
            // @ts-ignore
            expect(history._branchLogs[0].length).to.equal(2);
            let head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal(data1);
            // @ts-ignore
            expect(head.depth).to.equal(1);

            // 3. Forward with a different object
            const id3 = history.forward(data3, 2, 0);
            expect(id3).to.equal(1); // Should be a new log
            // @ts-ignore
            expect(history._logs[1].count).to.equal(1);
            // @ts-ignore
            expect(history._branchLogs[0].length).to.equal(3);
            head = history.getBranchHead(0);
            // @ts-ignore
            expect(head.log).to.deep.equal(data3);
            // @ts-ignore
            expect(head.depth).to.equal(2);
        });
    });
    // @ts-ignore
    describe('branchOutHistory', function () {
        // @ts-ignore
        it('is wip', function () {
            //history.branchOutHistory()
        })

    })
});
