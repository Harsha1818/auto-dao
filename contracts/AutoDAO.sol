// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Tokenomics.sol";
import "./GovernanceAgent.sol";
import "./VotingAgent.sol";

contract AutoDAO {
    address public owner;
    TokenomicsAgent public tokenomics;
    GovernanceAgent public governance;
    VotingAgent public voting;

    constructor() {
        owner = msg.sender;
        tokenomics = new TokenomicsAgent();
        governance = new GovernanceAgent();
        voting = new VotingAgent();
    }

    // ===== PROPOSAL STORAGE =====

    struct Proposal {
        string content;
        address creator;
    }

    Proposal[] public proposals;

    event ProposalAdded(uint indexed id, string content, address indexed creator);

    function addProposal(string memory _content) public {
        proposals.push(Proposal({
            content: _content,
            creator: msg.sender
        }));
        emit ProposalAdded(proposals.length - 1, _content, msg.sender);
    }

    /// @notice Get total number of proposals
    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    /// @notice Get all proposal contents (for frontend display)
    function getProposals() public view returns (string[] memory) {
        string[] memory contents = new string[](proposals.length);
        for (uint i = 0; i < proposals.length; i++) {
            contents[i] = proposals[i].content;
        }
        return contents;
    }

    // ===== AGENT INFO GETTERS =====

    function getTokenomics() external view returns (string memory) {
        return tokenomics.getDetails();
    }

    function getGovernanceRules() external view returns (string memory) {
        return governance.getRules();
    }

    function getVotingRules() external view returns (string memory) {
        return voting.getRules();
    }
}
