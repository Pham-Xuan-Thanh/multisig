import {ethers} from "hardhat";




async function main() {

  

  var listowners = process.argv[2].slice(1,-1).split(",")
  var required = process.argv[3]
  const [deployer] = await ethers.getSigners();

  try {
    listowners.map(owner => {
      if ( !ethers.utils.isAddress(owner)) 
      {
        throw new Error("Invalid address!!! : " + owner);
        
      }
    } )
  } catch (error) {
    console.log("Invalid owner address: " ,error)
    return 
  }
  
 
  console.log("Deploying contracts with the account:", deployer.address);

  const WalletContractFactory = await ethers.getContractFactory("MultiSigWallet");

  const walletContract = await WalletContractFactory.deploy(listowners, required);

  console.log("Contract address:", walletContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
