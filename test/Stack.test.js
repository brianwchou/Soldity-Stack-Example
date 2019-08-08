const Stack = artifacts.require('Stack');
const truffleAssert = require('truffle-assertions');

contract('Stack', async () => {
    
    var stack;

    beforeEach(async () => {
        stack = await Stack.new()
    })

    it("push() increments size of stack", async () => {
        await stack.push(5)
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 1, "value was not pushed")
    });

    it("getSize() returns length with stack empty", async () => {
        let value = await stack.getSize()
        assert.equal(value.toNumber(), 0, 'stack is not empty')
    })

    // it("peek() test with stack empty", async () => {
    //     truffleAssert.fails(stack.peek(), truffleAssert.ErrorType.REVERT, "stack had items")
    // })

    // it("pop() test with stack empty", async () => {
    //     truffleAssert.fails(await stack.pop(), truffleAssert.ErrorType.REVERT ,'cannot pop from an empty stack')
    // })

    // it("getSize() returns length with stack filled", () => {

    // })

    // it("do something", () => {

    // })

    // it("do something", () => {

    // })

    // it("do something", () => {

    // })

})