import {ethers } from "hardhat";
import { MultiSigWallet} from "../types/MultiSigWallet";

const MULTISIG_CONTRACT_ADDRESS = process.env.MULTISIG_CONTRACT_ADDRESS ?? '';

async function main() {
  console.log("Check current contract information");

  const MultisigContractFactory = await ethers.getContractFactory("MultiSigWallet");
  const multisigContract = await MultisigContractFactory.attach(MULTISIG_CONTRACT_ADDRESS) as MultiSigWallet;
  
  const multisigAddress = multisigContract.address


  const [onwers, balance , numofConfirmed, amountTX ] = await Promise.all([
    multisigContract.getOwners(),
    multisigContract.provider.getBalance(multisigAddress),
    multisigContract.numConfirmationsRequired(),
    multisigContract.getTransactionCount()
  ])


 

  console.log("========================Multisig Addres:",multisigAddress,"=============================")
  console.log(`Balance: ${ethers.utils.formatEther(balance)} W`)
  console.log('Number of owner: ', onwers.length);
  console.log('Number of Require owner confirmed: ', numofConfirmed.toNumber());
  console.log('Current owner list', onwers);
  console.log("with amount of transaction submitted: " , amountTX.toNumber())

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
