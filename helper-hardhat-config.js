const developmentChains = ["hardhat", "localhost"];
const MIN_DELAY = 3600;
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const QUORUM_PERCENTAGE = 4;
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const FUNC = "store";
const NEW_STORE_VALUE = 77;
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box";
const proposalsFile = "proposals.json";

module.exports = {
    developmentChains,
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    QUORUM_PERCENTAGE,
    ADDRESS_ZERO,
    FUNC,
    NEW_STORE_VALUE,
    PROPOSAL_DESCRIPTION,
    proposalsFile,
};
