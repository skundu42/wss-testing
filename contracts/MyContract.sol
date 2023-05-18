pragma solidity ^0.8.18;

contract MyContract {
    event MyEvent(uint256 indexed value);

    function triggerEvent(uint256 _value) public {
        emit MyEvent(_value);
    }
}
