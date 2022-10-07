const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config");
const fs = require("fs");
const { network, ethers } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

const index = 0;
const main = async (proposalIndex) => {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId][proposalIndex];
    const voteWay = 1;
    const governor = await ethers.getContract("GovernorContract");
    const reason = "Reason for voting";
    const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWay, reason);
    await voteTxResponse.wait(1);
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1);
    }
    console.log("Voted!");
};

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
