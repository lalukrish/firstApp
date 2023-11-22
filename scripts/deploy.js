const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.deployContract("chai");

  await chai.waitForDeployment();

  console.log(` deployed to ${chai.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
