import {ethers} from "hardhat";
import {MultiSigWallet} from "../types/MultiSigWallet";

const MULTISIG_CONTRACT_ADDRESS = process.env.MULTISIG_CONTRACT_ADDRESS ?? '';


async function main() {

  // Check parameter from cli
  const txID = process.argv[2]

  

  const [account] = await ethers.getSigners();

  console.log(`Multisig: address=${MULTISIG_CONTRACT_ADDRESS}, account=${account.address}`);
  console.log(`Account balance: ${(await account.getBalance()).toString()}`);

  const MultisigContractFactory = await ethers.getContractFactory("MultiSigWallet");

  let multisigcontract = await MultisigContractFactory.attach(MULTISIG_CONTRACT_ADDRESS) as MultiSigWallet;
  multisigcontract = multisigcontract.connect(account);
  

  const {to , value, data} = await multisigcontract.getTransaction(txID)
  const tx = await multisigcontract.executeTransaction(txID)
  const receipt = await tx.wait();

  console.log("Transaction:", tx.hash);

  receipt.events?.map(event => {
    if ( event?.args) {
      const [owner, txIndex  ] =  event.args.slice(0,2)
      console.log(
`  
  Owner: ${owner} start execution Transaction ID=${txIndex}
    The Transaction information:
    to: ${to} 
    value: ${value}
    data: ${data}`
       )
    }
      
    
  })
  
  
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
