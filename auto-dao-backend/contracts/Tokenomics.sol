// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenomicsAgent {
    function getDetails() public pure returns (string memory) {
        return "Token supply: 1M, Inflation: 2% yearly, Allocation: Community 60%, Team 20%, Reserve 20%";
    }
}
