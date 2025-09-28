const { expect } = require('chai');
const sinon = require('sinon');
const { MapedHistory, MapedHistoryDeepEqual } = require('./maped_history.cjs');

describe('MapedHistory', () => {
    /**
     * @type {MapedHistory}
     */
    let history;

    beforeEach(() => {
        history = new MapedHistory();
    });

    describe('Constructor', () => {
        it('should initialize with empty logs and default branchId 0', () => {
            expect(history._logs).to.deep.equal({});
            expect(history._branchLogs).to.deep.equal({});
            expect(history._countRef).to.deep.equal({ n: 0 });
            expect(history._branchId).to.equal(0);
        });

        it('should initialize with provided data', () => {
            const initData = {
                logs: { '0': { log: { a: 1 }, count: 1 } },
                branchLogs: { '0': [{ id: 0, depth: 0 }] },
                countRef: { n: 1 },
                linkMap: { '1': 0 },
                linkedCounts: { '0': 1 }
            };
            const h = new MapedHistory(initData);
            expect(h._logs).to.deep.equal(initData.logs);
            expect(h._branchLogs).to.deep.equal(initData.branchLogs);
            expect(h._countRef).to.deep.equal(initData.countRef);
            expect(h._linkMap).to.deep.equal(initData.linkMap);
            expect(h._linkedCounts).to.deep.equal(initData.linkedCounts);
        });
    });

    describe('add / addNewLog', () => {
        it('should add a new log and update branch history', () => {
            const data = { message: 'hello' };
            const id = history.addNewLog(data, 0, 0);

            expect(id).to.equal(0);
            expect(history._countRef.n).to.equal(1);
            expect(history._logs[0]).to.deep.equal({ log: data, count: 1 });
            expect(history._branchLogs[0]).to.deep.equal([{ id: 0, depth: 0 }]);
        });

        it('should throw an error if branchId is not provided and not set', () => {
            history.setBranchId(null);
            expect(() => history.addNewLog({ a: 1 }, 0)).to.throw('branchId  is not defined');
        });
    });

    describe('addNonUpdateLog', () => {
        it('should add a reference to an existing log', () => {
            const data = { message: 'initial' };
            const id = history.addNewLog(data, 0, 0);

            history.addNonUpdateLog(id, 1, 0);

            expect(history._countRef.n).to.equal(1); // Should not increment
            expect(history._logs[0].count).to.equal(2);
            expect(history._branchLogs[0]).to.deep.equal([
                { id: 0, depth: 0 },
                { id: 0, depth: 1 }
            ]);
        });

        it('should throw an error if branch does not exist', () => {
            expect(() => history.addNonUpdateLog(0, 0, 99)).to.throw('branchId 99 is not found');
        });
    });

    describe('forward', () => {
        it('should add a new log if branch is empty', () => {
            const data = { a: 1 };
            const id = history.forward(data, 0, 0);
            expect(id).to.equal(0);
            const head = history.getBranchHead(0);
            expect(head.log).to.deep.equal(data);
            expect(head.depth).to.equal(0);
        });

        it('should add a new log if data is different (reference check)', () => {
            const data1 = 'hello';
            const data2 = 'world';
            history.forward(data1, 0, 0);
            const id2 = history.forward(data2, 1, 0);

            expect(id2).to.equal(1);
            const head = history.getBranchHead(0);
            expect(head.log).to.equal('world');
            expect(head.depth).to.equal(1);
            expect(history._branchLogs[0].length).to.equal(2);
        });

        it('should add a non-update log if data is the same (reference check)', () => {
            const data1 = 'hello';
            history.forward(data1, 0, 0);
            const id2 = history.forward(data1, 1, 0);

            expect(id2).to.equal(0); // Should return existing ID
            expect(history._logs[0].count).to.equal(2);
            expect(history._branchLogs[0].length).to.equal(2);
        });
    });

    describe('back', () => {
        beforeEach(() => {
            history.forward('step 1', 0, 0);
            history.forward('step 2', 1, 0);
        });

        it('should go back one step and decrement log count', () => {
            let head = history.getBranchHead(0);
            expect(head.log).to.equal('step 2');
            expect(head.depth).to.equal(1);

            const { removedLogItem, logExist } = history.back(0);

            expect(removedLogItem).to.deep.equal({ id: 1, depth: 1 });
            expect(logExist).to.be.true;
            head = history.getBranchHead(0);
            expect(head.log).to.equal('step 1');
            expect(head.depth).to.equal(0);
            expect(history._logs[1].count).to.equal(0); // count is decremented
        });

        it('should delete log from _logs if count becomes 0', () => {
            expect(history._logs[1]).to.exist;
            history.back(0);
            expect(history._logs[1]).to.not.exist;
        });

        it('should handle multiple references correctly', () => {
            // Add a reference to 'step 1'
            history.forward('step 1', 2, 0);
            expect(history._logs[0].count).to.equal(2);

            // Go back from the 'step 1' reference
            history.back(0);
            expect(history._logs[0].count).to.equal(1); // count is 1
            expect(history._logs[0]).to.exist; // log should still exist

            // Go back from 'step 2'
            history.back(0);
            expect(history._logs[1]).to.not.exist;

            // Go back from the original 'step 1'
            history.back(0);
            expect(history._logs[0]).to.not.exist; // Now it should be deleted
        });

        it('should throw an error if trying to back on an empty branch', () => {
            history.back(0);
            history.back(0);
            expect(() => history.back(0)).to.throw('branchId 0 is not found');
        });
    });

    describe('fork', () => {
        let forkedHistory;

        beforeEach(() => {
            history.forward({ data: 'original' }, 0, 0);
            forkedHistory = history.fork(1); // Fork to new branch '1'
        });

        it('should create a new instance with a different branchId', () => {
            expect(forkedHistory).to.be.an.instanceof(MapedHistory);
            expect(forkedHistory._branchId).to.equal(1);
            expect(history._branchId).to.equal(0);
        });

        it('should share internal data structures by reference', () => {
            expect(forkedHistory._logs).to.equal(history._logs);
            expect(forkedHistory._branchLogs).to.equal(history._branchLogs);
            expect(forkedHistory._countRef).to.equal(history._countRef);
        });

        it('should reflect changes from the forked instance in the original', () => {
            // Add a log in the forked history
            forkedHistory.forward({ data: 'forked' }, 0); // Uses its branchId '1'

            // Check both histories
            expect(history._countRef.n).to.equal(2);
            expect(history._logs[1]).to.deep.equal({ log: { data: 'forked' }, count: 1 });
            expect(history._branchLogs[1]).to.deep.equal([{ id: 1, depth: 0 }]);

            // The original branch should be unaffected
            const head = history.getBranchHead(0);
            expect(head.log).to.deep.equal({ data: 'original' });
            expect(head.depth).to.equal(0);
        });

        it('should reflect changes from the original instance in the forked one', () => {
            // Add a log in the original history
            history.forward({ data: 'original_new' }, 1); // Uses its branchId '0'

            // Check both histories
            expect(forkedHistory._countRef.n).to.equal(2);
            expect(forkedHistory._logs[1]).to.deep.equal({ log: { data: 'original_new' }, count: 1 });

            // The forked branch should not exist yet in the shared logs
            expect(forkedHistory.getBranchHead(1, false)).to.be.null;
        });
    });

    describe('getSerializedData', () => {
        it('should return a deep copy of the data including branch links', () => {
            history.forward({ a: { b: 1 } }, 0, 0);
            const forked = history.fork(); // creates branch 1 from 0
            const serialized = history.getSerializedData();

            // Ensure they are not the same reference
            expect(serialized.logs).to.not.equal(history._logs);
            expect(serialized.branchLogs).to.not.equal(history._branchLogs);
            expect(serialized.countRef).to.not.equal(history._countRef);
            expect(serialized.linkMap).to.not.equal(history._linkMap);
            expect(serialized.linkedCounts).to.not.equal(history._linkedCounts);

            // Ensure values are the same
            expect(serialized.logs).to.deep.equal(history._logs);
            expect(serialized.branchLogs).to.deep.equal(history._branchLogs);
            expect(serialized.countRef).to.deep.equal(history._countRef);
            expect(serialized.linkMap).to.deep.equal(history._linkMap);
            expect(serialized.linkedCounts).to.deep.equal(history._linkedCounts);

            // Modify the copy and check if the original is unchanged
            serialized.logs[0].log.a.b = 99;
            serialized.branchLogs[0][0].id = 99;
            serialized.countRef.n = 99;
            serialized.linkMap[forked._branchId] = 99;
            serialized.linkedCounts[0] = 99;

            expect(history._logs[0].log.a.b).to.equal(1);
            expect(history._branchLogs[0][0].id).to.equal(0);
            expect(history._countRef.n).to.equal(2); // 1 for log, 1 for branch
            expect(history._linkMap[forked._branchId]).to.equal(0);
            expect(history._linkedCounts[0]).to.equal(1);
        });
    });

    describe('Branching (fork, remove, counts)', () => {
        beforeEach(() => {
            history.setBranchId(0);
            history.forward('data 0', 0);
        });

        it('fork() should create a new branch linked to the parent', () => {
            const parentBranchId = history._branchId;
            expect(history.getLinkedCount(parentBranchId)).to.equal(0);

            const forkedHistory = history.fork(); // Fork without ID
            const newBranchId = forkedHistory._branchId;

            expect(newBranchId).to.not.equal(parentBranchId);
            expect(history.getParentBranchId(newBranchId)).to.equal(parentBranchId);
            expect(history.getLinkedCount(parentBranchId)).to.equal(1);
        });

        it('removeBranch() should delete a branch and update parent link count', () => {
            const parentBranchId = history._branchId;
            const forkedHistory = history.fork();
            const forkedBranchId = forkedHistory._branchId;

            expect(history.getLinkedCount(parentBranchId)).to.equal(1);
            expect(history._branchLogs[forkedBranchId]).to.exist;
            expect(history._linkMap[forkedBranchId]).to.exist;

            history.removeBranch(forkedBranchId);

            expect(history.getLinkedCount(parentBranchId)).to.equal(0);
            expect(history._branchLogs[forkedBranchId]).to.not.exist;
            expect(history._linkMap[forkedBranchId]).to.not.exist;
        });

        it('getLinkedCount() should return 0 for branches with no children or non-existent branches', () => {
            expect(history.getLinkedCount(0)).to.equal(0); // No children yet
            const forked = history.fork();
            expect(history.getLinkedCount(0)).to.equal(1);
            expect(history.getLinkedCount(forked._branchId)).to.equal(0); // Forked branch has no children
            expect(history.getLinkedCount(999)).to.equal(0); // Non-existent branch
        });

        it('getParentBranchId() should return the parent ID', () => {
            const forked = history.fork();
            expect(history.getParentBranchId(forked._branchId)).to.equal(0);
            expect(history.getParentBranchId(0)).to.be.undefined; // Root branch
        });
    });
});

describe('MapedHistoryDeepEqual', () => {
    /**
     * @type {MapedHistoryDeepEqual}
     */
    let history;

    beforeEach(() => {
        history = new MapedHistoryDeepEqual();
    });

    it('addNewLog should return the new log ID', () => {
        const data = { message: 'test' };
        const id = history.addNewLog(data, 0, 0);
        expect(id).to.equal(0);
        expect(history.getBranchHeadId(0)).to.equal(0);
    });

    it('should correctly clone Date objects to prevent mutation', () => {
        const date = new Date();
        history.addNewLog({ time: date }, 0, 0);

        const head = history.getBranchHead(0);
        expect(head.log.time).to.be.an.instanceof(Date);
        expect(head.log.time.getTime()).to.equal(date.getTime());

        // Mutate original date
        date.setFullYear(1999);

        // The log in history should not be affected
        const newHead = history.getBranchHead(0);
        expect(newHead.log.time.getFullYear()).to.not.equal(1999);
        expect(newHead.log.time.getTime()).to.not.equal(date.getTime());
    });

    describe('forward with _checkEqual override', () => {
        it('should use deep equality for comparison', () => {
            const data1 = { user: { id: 1, name: 'A' } };
            const data2 = { user: { id: 1, name: 'A' } }; // Same value, different reference
            const data3 = { user: { id: 2, name: 'B' } };

            // 1. Add initial log
            const id1 = history.forward(data1, 0, 0);
            expect(id1).to.equal(0);
            expect(history._logs[0].count).to.equal(1);
            expect(history._branchLogs[0].length).to.equal(1);

            // 2. Forward with a deeply equal object
            const id2 = history.forward(data2, 1, 0);
            expect(id2).to.equal(id1); // Should be a non-update
            expect(history._logs[0].count).to.equal(2);
            expect(history._branchLogs[0].length).to.equal(2);
            let head = history.getBranchHead(0);
            expect(head.log).to.deep.equal(data1);
            expect(head.depth).to.equal(1);

            // 3. Forward with a different object
            const id3 = history.forward(data3, 2, 0);
            expect(id3).to.equal(1); // Should be a new log
            expect(history._logs[1].count).to.equal(1);
            expect(history._branchLogs[0].length).to.equal(3);
            head = history.getBranchHead(0);
            expect(head.log).to.deep.equal(data3);
            expect(head.depth).to.equal(2);
        });
    });
});
