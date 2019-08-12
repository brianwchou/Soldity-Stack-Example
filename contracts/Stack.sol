pragma solidity >=0.4.25 <0.6.0;

contract Stack {
    uint[] private data;

    function peek() public view returns(uint) {
        require(data.length > 0, "stack needs to have a value");

        return data[data.length - 1];
    }

    function pop() public {
        require(data.length > 0, "stack needs to have values");

        data.length -= 1;
    }

    function push(uint _value) public {
        data.push(_value);
    }

    function getSize() public view returns(uint) {
        return data.length;
    }
}
