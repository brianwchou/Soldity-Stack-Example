pragma solidity >=0.4.25 <0.6.0;

contract Stack {
    uint[10] private array;
    uint private counter = 0;
    uint private constant MAX_SIZE = 10;

    function peek() public view returns(uint) {
        require(counter > 0, "stack needs to have a value");

        return array[counter];
    }

    function pop() public {
        require(counter > 0, "stack needs to have values");

        delete array[counter - 1];
        counter -= 1;
    }

    function push(uint _value) public {
        require(counter <= 10, "stack needs to be at under capacity");

        array[counter] = _value;
        counter += 1;
    }

    function getSize() public view returns(uint) {
        return counter;
    }
}
