pragma solidity 0.5.12;

contract Stack {
    uint256[] private data;

    event PushEvent(uint256 value);
    event PopEvent(uint256 value);

    function peek() external view returns(uint256) {
        require(data.length > 0, "stack is empty");

        return data[data.length - 1];
    }

    function pop() external returns(uint256){
        require(data.length > 0, "stack is empty");

        uint256 retrievedValue = data[data.length - 1];

        emit PopEvent(retrievedValue);

        data.length -= 1;
        return retrievedValue;
    }

    function push(uint256 _value) external {
        data.push(_value);
        emit PushEvent(_value);
    }

    function getSize() external view returns(uint256) {
        return data.length;
    }
}
