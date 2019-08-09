const Stack = artifacts.require('Stack');
const truffleAssert = require('truffle-assertions');

contract('Stack', async () => {
    
    var stack;

    beforeEach(async() => {
        stack = await Stack.new()
    })

    it('push() increments size of stack', async() => {
        await stack.push(5)
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 1, 'value was not pushed')
    });

    it('peek() reverts with stack empty', async() => {
        truffleAssert.reverts(stack.peek(), 'stack needs to have a value')
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
        truffleAssert.reverts(stack.pop(), 'stack needs to have values')
    })

    it('pop() removes top', async() => {
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 0, 'stack is not empty')

        await stack.push(5)
        value = await stack.getSize()
        assert.equal(value.toNumber(), 1, 'stack needs to have values')
    })
})
