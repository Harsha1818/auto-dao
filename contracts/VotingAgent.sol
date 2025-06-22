// Inside VotingAgent.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingAgent {
    string public rules;
    string[] public proposals;

    event ProposalAdded(uint indexed proposalId, string content, address indexed sender);

    constructor() {
        rules = "One token one vote. Quorum: 10%. Majority wins.";
    }

    function getRules() external view returns (string memory) {
        return rules;
    }

    function addProposal(string memory content) public {
        proposals.push(content);
        emit ProposalAdded(proposals.length - 1, content, msg.sender);
    }

    function getProposal(uint id) public view returns (string memory) {
        return proposals[id];
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }
}
