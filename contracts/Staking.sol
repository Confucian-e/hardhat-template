// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Staking {
    // 质押信息
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    // 用户质押信息
    mapping(address => Stake) public stakes;

    // 质押期限(单位:秒)
    uint256 public stakingDuration = 30 days;

    // 质押奖励比例(1 = 100%)
    uint256 public rewardRate = 10; 

    // 质押事件
    event Staked(address indexed user, uint256 amount, uint256 timestamp);

    // 取回事件 
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);

    // 质押 ETH
    function stake(uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value == amount, "Sent value must match the amount");

        Stake storage userStake = stakes[msg.sender];
        userStake.amount += amount;
        userStake.timestamp = block.timestamp;

        emit Staked(msg.sender, amount, block.timestamp);
    }

    // 取回质押的 ETH 及奖励
    function withdraw() public {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake to withdraw");
        require(block.timestamp >= userStake.timestamp + stakingDuration, "Staking duration not met");

        uint256 reward = (userStake.amount * rewardRate) / 100;
        uint256 totalAmount = userStake.amount + reward;

        delete stakes[msg.sender];

        payable(msg.sender).transfer(totalAmount);

        emit Withdrawn(msg.sender, userStake.amount, reward);
    }
}