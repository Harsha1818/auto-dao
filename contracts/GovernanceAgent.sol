// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GovernanceAgent {
    function getRules() public pure returns (string memory) {
        return "Proposal threshold: 100 tokens, Voting period: 7 days, Quorum: 20%";
    }
}
