const { expect } = require('chai');

const { Stack, StackTree } = require('./stack.cjs');

describe('Stack', () => {
    it('should initialize an empty stack', () => {
        const stack = new Stack();
        expect(stack.isEmpty()).to.be.true;
        expect(stack.length).to.equal(0);
    });

    it('should initialize with items and clone them', () => {
        const initialItems = [{ id: 1 }, { id: 2 }];
        const stack = new Stack(initialItems);
        expect(stack.length).to.equal(2);
        expect(stack.get()).to.deep.equal({ id: 2 });
        initialItems[1].id = 99; // Modify original
        expect(stack.get()).to.deep.equal({ id: 2 }); // Cloned item should not change
    });

    it('should push items to the stack', () => {
        const stack = new Stack();
        stack.push({ id: 1 });
        expect(stack.length).to.equal(1);
        expect(stack.get()).to.deep.equal({ id: 1 });
    });

    it('should pop items from the stack', () => {
        const stack = new Stack([{ id: 1 }, { id: 2 }]);
        const popped = stack.pop();
        expect(popped).to.deep.equal({ id: 2 });
        expect(stack.length).to.equal(1);
        expect(stack.get()).to.deep.equal({ id: 1 });
    });

    it('should throw an error when popping from an empty stack', () => {
        const stack = new Stack();
        expect(() => stack.pop()).to.throw('Stack is empty');
    });

    it('should get items from the stack', () => {
        const stack = new Stack([{ id: 1 }, { id: 2 }, { id: 3 }]);
        expect(stack.get(0)).to.deep.equal({ id: 3 });
        expect(stack.get(1)).to.deep.equal({ id: 2 });
        expect(stack.get(2)).to.deep.equal({ id: 1 });
    });

    it('should throw an error when getting from an empty stack', () => {
        const stack = new Stack();
        expect(() => stack.get()).to.throw('Stack is empty');
    });

    it('should throw an error for an out-of-bounds get', () => {
        const stack = new Stack([{ id: 1 }]);
        expect(() => stack.get(1)).to.throw('Stack depth is 0, but digg is 1');
    });

    it('should update the top item (merge)', () => {
        const stack = new Stack([{ id: 1, name: 'A' }]);
        stack.update({ name: 'B', value: 100 });
        expect(stack.get()).to.deep.equal({ id: 1, name: 'B', value: 100 });
    });

    it('should update the top item (full overwrite)', () => {
        const stack = new Stack([{ id: 1, name: 'A' }]);
        stack.update({ id: 2 }, true);
        expect(stack.get()).to.deep.equal({ id: 2 });
    });

    it('should throw an error when updating an empty stack', () => {
        const stack = new Stack();
        expect(() => stack.update({ id: 1 })).to.throw('Stack is empty');
    });

    it('should return serialized data as a deep copy', () => {
        const stack = new Stack([{ id: 1 }]);
        const data = stack.getSerializedData();
        expect(data).to.deep.equal([{ id: 1 }]);
        data[0].id = 99;
        expect(stack.get()).to.deep.equal({ id: 1 });
    });
});

describe('StackTree', () => {
    it('should initialize an empty tree', () => {
        const tree = new StackTree();
        expect(tree.getBranchId()).to.equal(0);
        expect(tree.isTop(0)).to.be.true;
        expect(tree.isEnd()).to.be.true;
    });

    it('should handle constructor with initData=false', () => {
        const tree = new StackTree(false);
        // It should not initialize any branches
        expect(tree._branches).to.deep.equal({});
    });

    it('should push and pop data on the current branch', () => {
        const tree = new StackTree();
        tree.push({ step: 1 });
        tree.push({ step: 2 });
        expect(tree.getBranchDepth()).to.equal(2);
        expect(tree.get()).to.deep.equal({ step: 2 });
        const popped = tree.pop();
        expect(popped).to.deep.equal({ step: 2 });
        expect(tree.get()).to.deep.equal({ step: 1 });
    });

    it('should set and switch branch IDs', () => {
        const tree = new StackTree();
        tree.push({ branch: 0 });
        tree.setBranchId(1);
        expect(tree.getBranchId()).to.equal(1);
        expect(tree.isEnd()).to.be.true; // New branch is empty
        tree.push({ branch: 1 });
        expect(tree.get()).to.deep.equal({ branch: 1 });

        tree.setBranchId(0);
        expect(tree.getBranchId()).to.equal(0);
        expect(tree.get()).to.deep.equal({ branch: 0 });
    });

    it('should serialize and deserialize the tree state', () => {
        const tree = new StackTree();
        tree.push({ id: 'a' });
        tree.setBranchId(1);
        tree.push({ id: 'b' });

        const serializedData = tree.getSerializedData();
        expect(serializedData.branches).to.have.property('0');
        expect(serializedData.branches).to.have.property('1');
        expect(serializedData.branches[0][0]).to.deep.equal({ id: 'a' });

        const newTree = new StackTree(serializedData);
        expect(newTree.getBranchId()).to.equal(0); // Defaults to topId
        expect(newTree.get()).to.deep.equal({ id: 'a' });
        newTree.setBranchId(1);
        expect(newTree.get()).to.deep.equal({ id: 'b' });
    });

    describe('fork()', () => {
        it('should create a new tree instance pointing to a new branch', () => {
            const tree = new StackTree();
            const fork = tree.fork();

            expect(fork).to.be.an.instanceof(StackTree);
            expect(fork.getBranchId()).to.not.equal(tree.getBranchId());
        });

        it('should reflect changes in the fork back to the original tree (shared data)', () => {
            const tree = new StackTree();
            tree.push({ original: true });

            // Fork the tree. The fork gets a new branch ID.
            const fork = tree.fork();
            const forkBranchId = fork.getBranchId();

            // Push data to the new branch via the forked instance
            fork.push({ fromFork: true });

            // The original tree should be able to see the new data by switching to the fork's branch
            tree.setBranchId(forkBranchId);
            expect(tree.getBranchDepth()).to.equal(1);
            expect(tree.get()).to.deep.equal({ fromFork: true });
        });

        it('should correctly increment and share the branch counter', () => {
            const tree = new StackTree();
            const initialCount = tree._countRef.n; // Should be 1

            const fork1 = tree.fork();
            const countAfterFork1 = tree._countRef.n;
            expect(countAfterFork1).to.equal(initialCount + 1);
            expect(fork1._countRef.n).to.equal(countAfterFork1);

            const fork2 = fork1.fork();
            const countAfterFork2 = tree._countRef.n;
            expect(countAfterFork2).to.equal(countAfterFork1 + 1);
            expect(tree._countRef.n).to.equal(countAfterFork2);
            expect(fork1._countRef.n).to.equal(countAfterFork2);
            expect(fork2._countRef.n).to.equal(countAfterFork2);
        });

        it('should create distinct branches for each fork call without an ID', () => {
            const tree = new StackTree();

            const fork1 = tree.fork();
            fork1.push({ id: 1 });

            const fork2 = tree.fork();
            fork2.push({ id: 2 });

            expect(fork1.get()).to.deep.equal({ id: 1 }); // Should not be affected by fork2
            expect(fork2.get()).to.deep.equal({ id: 2 });
        });
    });

    it('should remove a branch', () => {
        const tree = new StackTree();
        tree.setBranchId(1);
        tree.push({ data: 'to be removed' });

        expect(tree._branches).to.have.property('1');
        tree.removeBranch(1);
        expect(tree._branches).to.not.have.property('1');
    });

    it('should track linked branch counts and parent IDs', () => {
        const tree = new StackTree(); // branch 0
        expect(tree.getLinkedCount(0)).to.equal(0);

        const fork1 = tree.fork(); // forks from 0, creates branch 1
        expect(tree.getLinkedCount(0)).to.equal(1);
        expect(fork1.getParentBranchId(fork1.getBranchId())).to.equal(0);

        const fork2 = tree.fork(); // forks from 0, creates branch 2
        expect(tree.getLinkedCount(0)).to.equal(2);
        expect(fork2.getParentBranchId(fork2.getBranchId())).to.equal(0);

        const fork3 = fork1.fork(); // forks from 1, creates branch 3
        expect(tree.getLinkedCount(0)).to.equal(2);
        expect(tree.getLinkedCount(1)).to.equal(1);
        expect(fork3.getParentBranchId(fork3.getBranchId())).to.equal(1);

        // Test removeBranch decrements the count
        tree.removeBranch(fork2.getBranchId()); // remove branch 2
        expect(tree.getLinkedCount(0)).to.equal(1);

        tree.removeBranch(fork3.getBranchId()); // remove branch 3
        expect(tree.getLinkedCount(1)).to.equal(0);
    });
});