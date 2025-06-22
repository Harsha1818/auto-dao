// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingAgent {
    function getRules() public pure returns (string memory) {
        return "1 token = 1 vote, simple majority, staking optional";
    }
}
