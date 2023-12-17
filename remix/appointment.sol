// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AppointmentContract {
    // Variable to store a single string
    string public storedString;

    // Function to set the stored string
    function setString(string memory _value) public {
        storedString = _value;
    }

    // Function to get the stored string
    function getString() public view returns (string memory) {
        return storedString;
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }
}