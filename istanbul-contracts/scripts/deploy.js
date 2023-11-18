
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const AutoDCA = await ethers.getContractFactory("AutoDCA");
    const autoDCA = await AutoDCA.deploy(); // Add constructor arguments if needed

    console.log("AutoDCA address:", autoDCA.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });