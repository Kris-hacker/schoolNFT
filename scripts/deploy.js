async function main() {
    const LearnFiNFT = await ethers.getContractFactory("MyNFT")
    // Start deployment, returning a promise that resolves to a contract object
    const learnFiNFT = await LearnFiNFT.deploy()
    await learnFiNFT.deployed()
    console.log("Contract deployed to address:", learnFiNFT.address)
}
  
main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
})
  