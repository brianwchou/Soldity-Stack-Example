const Stack = artifacts.require('Stack')
const truffleAssert = require('truffle-assertions')
const timeUtil = require('ganache-time-traveler')

contract('Stack', async () => {
    
    let stack;
    let snapshotId;

    beforeEach(async() => {
        let snapshot = await timeUtil.takeSnapshot()
        snapshotId = snapshot.result
    })

    afterEach(async() => {
        await timeUtil.revertToSnapshot(snapshotId)
    })
    
  before(async() => {
        stack = await Stack.new()
    })

    it('test peek() with empty stack', async() => {
        await truffleAssert.reverts(stack.peek.call(), 'stack is empty')
    })

    it('test push() with empty stack', async() => {
        let tx = await stack.push(5)
        let value = await stack.getSize.call()

        truffleAssert.eventEmitted(tx, 'PushEvent', ev => {
            return ev.value.toNumber() === 5 
        }, "PushEvent should be emitted with correct parameters")

        assert.equal(value.toNumber(), 1, 'value was not pushed')
    })

    it('test pop() with empty stack', async() => {
        await truffleAssert.reverts(stack.pop(), 'stack is empty')
    })

    it('test getSize() with empty stack', async() => {
        let value = await stack.getSize.call()
        assert.equal(value.toNumber(), 0, 'stack is not empty')
    })

    it('test peek() with non-empty stack', async() => {
        await stack.push(5)
        let value = await stack.peek.call()
        assert.equal(value.toNumber(), 5, 'stack needs to have values')
    })

    it('test push() with non-empty stack', async() => {
        let tx = await stack.push(5)
        let value = await stack.getSize.call()
        truffleAssert.eventEmitted(tx, 'PushEvent', ev => {
            return ev.value.toNumber() === 5 
        }, "PushEvent should be emitted with correct parameters")
        assert.equal(value.toNumber(), 1, 'value was not pushed')

        tx = await stack.push(6)
        value = await stack.getSize.call()
        truffleAssert.eventEmitted(tx, 'PushEvent', ev => {
            return ev.value.toNumber() === 6 
        }, "PushEvent should be emitted with correct parameters")
        assert.equal(value.toNumber(), 2, 'value was not pushed')
    })

    it('test pop() with non-empty stack', async() => {
        await stack.push(5)
        let size = await stack.getSize.call()
        assert.equal(size.toNumber(), 1, 'stack needs to have values')

        // dry run of stack pop
        let value = await stack.pop.call();
        assert.equal(value.toNumber(), 5);

        let tx = await stack.pop()

        truffleAssert.eventEmitted(tx, 'PopEvent', ev => {
            return ev.value.toNumber() === value.toNumber()
        }, "PopEvent should be emitted with expected pop value")

        size = await stack.getSize.call()
        assert.equal(size.toNumber(), 0, 'stack should be empty after pop')
    })

    it('test getSize() with non-empty stack', async() => {
        await stack.push(5)

        let value = await stack.getSize.call()
        assert.equal(value.toNumber(), 1, `stack has ${value.toNumber()} items when it should have 1`)
    })
})
