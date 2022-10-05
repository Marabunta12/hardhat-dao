const { network, ethers } = require("hardhat");
const {
    developmentChains,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const governanceToken = await ethers.getContract("GovernanceToken");
    const timeLock = await ethers.getContract("TimeLock");

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(governorContract.address, args);
    }
};

module.exports.tags = ["all", "governorContract"];
