// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "auto-dao-backend/contracts/Tokenomics.sol";
import "/Users/harshatumuluri/Downloads/p/auto-dao-backend/contracts/GovernanceAgent.sol";
import "/Users/harshatumuluri/Downloads/p/auto-dao-backend/contracts/VotingAgent.sol";

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
