pragma solidity >=0.4.25 <0.6.0;

contract Stack {
    uint[] private array;
    uint private counter = 0;

    function peek() public view returns(uint) {
        require(counter > 0, "stack needs to have a value");

        return array[counter - 1];
    }

    function pop() public {
        require(counter > 0, "stack needs to have values");

        delete array[counter - 1];
        counter -= 1;
    }

    function push(uint _value) public {
        array.push(_value);
        counter += 1;
    }

    function getSize() public view returns(uint) {
        return counter;
    }
}
