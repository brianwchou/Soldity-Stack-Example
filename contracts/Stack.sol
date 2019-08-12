pragma solidity >=0.4.25 <0.6.0;

contract Stack {
    uint256[] private data;

    event Push(uint256 value);
    event Pop(uint256 value);

    function peek() public view returns(uint256) {
        require(data.length > 0, "stack needs to have a value");

        return data[data.length - 1];
    }

    function pop() public {
        require(data.length > 0, "stack needs to have values");

        emit Push(data[data.length - 1]);

        data.length -= 1;
    }

    function push(uint256 _value) public {
        emit Pop(_value);

        data.push(_value);
    }

    function getSize() public view returns(uint256) {
        return data.length;
    }
}
