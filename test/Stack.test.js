const Stack = artifacts.require('Stack')
const truffleAssert = require('truffle-assertions')
const timeUtil = require('ganache-time-traveler')

contract('Stack', async () => {
    
    let stack;
    let snapshotId;

    before(async() => {
        stack = await Stack.new()
    })

    beforeEach(async() => {
        let snapshot = await timeUtil.takeSnapshot()
        snapshotId = snapshot.result
    })

    afterEach(async() => {
        await timeUtil.revertToSnapShot(snapshotId)
    })

    it('push() increments size of stack', async() => {
        let tx = await stack.push(5)
        let value = await stack.getSize()

        truffleAssert.eventEmitted(tx, 'PushEvent', {param1: 5})

        assert.equal(value.toNumber(), 1, 'value was not pushed')
    });

    it('peek() reverts with stack empty', async() => {
        await truffleAssert.reverts(stack.peek(), 'stack needs to have a value')
    })

    it('peek() retrieves pushed value', async() => {
        await stack.push(5)
        let value = await stack.peek()
        assert.equal(value.toNumber(), 5, 'stack needs to have values')
    })

    it('getSize() returns length with stack empty', async() => {
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 0, 'stack is not empty')
    })

    it('pop() fails with stack empty', async() => {
        await truffleAssert.reverts(stack.pop(), 'stack needs to have values')
    })

    it('pop() removes top', async() => {
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 0, 'stack is not empty')

        await stack.push(5)
        value = await stack.getSize()
        assert.equal(value.toNumber(), 1, 'stack needs to have values')
    })
})
