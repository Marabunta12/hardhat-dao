const { network, ethers } = require("hardhat");
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(timeLock.address, args);
    }
};

module.exports.tags = ["all", "timeLock"];
