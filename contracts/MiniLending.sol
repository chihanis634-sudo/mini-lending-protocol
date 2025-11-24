// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MiniLending {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrows;

    uint256 public constant INTEREST_RATE = 5; // 5%
    uint256 public constant BORROW_LIMIT = 50; // 50% of deposit

    event Deposited(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    function deposit() external payable {
        require(msg.value > 0, "Deposit must be > 0");
        deposits[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    function borrow(uint256 _amount) external {
        uint256 maxBorrow = (deposits[msg.sender] * BORROW_LIMIT) / 100;
        require(_amount <= maxBorrow, "Exceeds borrow limit");

        borrows[msg.sender] += _amount;
        payable(msg.sender).transfer(_amount);

        emit Borrowed(msg.sender, _amount);
    }

    function repay() external payable {
        require(borrows[msg.sender] > 0, "No active borrow");
        require(msg.value > 0, "Repay must be > 0");

        borrows[msg.sender] -= msg.value;
        emit Repaid(msg.sender, msg.value);
    }

    function getBorrowLimit(address user) public view returns (uint256) {
        return (deposits[user] * BORROW_LIMIT) / 100;
    }
}
